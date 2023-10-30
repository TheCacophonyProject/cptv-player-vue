import { CptvHeader } from "./cptv-decoder/decoder";

export interface TrackTag {
  what: string;
  data: string | { name: string } | undefined;
  automatic: boolean;
}

export const PlaybackSpeeds = Object.freeze([0.5, 1, 2, 4, 6]);

export const formatTime = (time: number): string => {
  let seconds = Math.floor(time);
  if (seconds < 60) {
    return `0:${`${seconds}`.padStart(2, "0")}`;
  }
  const minutes = Math.floor(seconds / 60);
  seconds = seconds - minutes * 60;
  return `${minutes}:${seconds.toString().padStart(2, "0").padEnd(2, "0")}`;
};

const getAuthoritativeTagForTrack = (trackTags: TrackTag[]): string | null => {
  const userTags = trackTags.filter((tag) => !tag.automatic);
  if (userTags.length) {
    return userTags[0].what;
  } else {
    const tag = trackTags.find(
      (tag) =>
        (tag.data && typeof tag.data === "string" && tag.data === "Master") ||
        (typeof tag.data === "object" &&
          tag.data.name &&
          tag.data.name === "Master")
    );
    if (tag) {
      return tag.what;
    }
  }
  return null;
};

export const formatHeaderInfo = (header: CptvHeader | null): string | null => {
  if (header) {
    const {
      width,
      height,
      fps,
      deviceName,
      deviceId,
      previewSecs,
      brand,
      model,
      serialNumber,
      firmwareVersion,
      motionConfig,
      timestamp,
      hasBackgroundFrame,
    } = header;
    const headerInfo: Record<
      string,
      string | boolean | number | Record<string, number | string>
    > = {
      dimensions: `${width} x ${height}`,
      fps,
      time: new Date(timestamp / 1000).toLocaleString(),
      "has background": hasBackgroundFrame,
      "preview seconds": previewSecs || 0,
    };
    if (deviceName) {
      headerInfo["device name"] = deviceName;
    }
    if (deviceId) {
      headerInfo["device ID"] = deviceId;
    }
    if (brand && model) {
      headerInfo["sensor"] = `${brand} ${model}`;
    }
    if (serialNumber) {
      headerInfo["serial"] = `#${serialNumber}`;
    }
    if (firmwareVersion) {
      headerInfo["firmware"] = firmwareVersion;
    }
    if (motionConfig) {
      headerInfo["motion config"] = motionConfig
        .split("\n")
        .reduce((acc: Record<string, number | string>, item: string) => {
          const parts = item.split(": ");
          if (Number(parts[1]).toString() == parts[1]) {
            acc[parts[0]] = Number(parts[1]);
          } else {
            acc[parts[0]] = parts[1];
          }
          return acc;
        }, {});
    }
    return JSON.stringify(headerInfo, null, "  ");
  } else {
    return null;
  }
};

// Check if positions is in old format or new and format accordingly
const getPositions = (
  positions: [number, Rectangle][] | Region[],
  timeOffset: number,
  frameTimeSeconds: number
): [number, Rectangle][] => {
  const frameAtTime = (time: number) => {
    return Math.round(time / frameTimeSeconds);
  };
  // Add a bit of breathing room around our boxes
  const padding = 5;
  if (positions.length > 0 && !Array.isArray(positions[0])) {
    return (positions as Region[]).map((position: Region) => [
      position.frameNumber ||
        (position.frameTime && frameAtTime(position.frameTime - timeOffset)) ||
        0,
      [
        Math.max(0, position.x - padding),
        Math.max(0, position.y - padding),
        position.x + position.width + padding,
        position.y + position.height + padding,
      ],
    ]);
  }
  // Map track box position times to actual frames, easier to use than time offsets.
  return (positions as [number, Rectangle][]).map(
    (position: [number, Rectangle]) => [
      frameAtTime(position[0] - timeOffset),
      [
        Math.max(0, position[1][0] - padding),
        Math.max(0, position[1][1] - padding),
        position[1][2] + padding,
        position[1][3] + padding,
      ],
    ]
  );
};

export const getProcessedTracks = (
  tracks: Track[],
  timeOffset: number,
  frameTimeSeconds: number
): Record<number, Record<number, TrackBox>> => {
  return tracks
    .map(({ positions, tags, id }) => ({
      what: (tags && getAuthoritativeTagForTrack(tags)) || null,
      positions: getPositions(positions, timeOffset, frameTimeSeconds),
      id,
    }))
    .reduce((acc: Record<number, Record<number, TrackBox>>, item) => {
      for (const position of item.positions) {
        acc[position[0]] = acc[position[0]] || {};
        const frame = acc[position[0]];
        frame[item.id] = {
          rect: position[1],
          what: item.what,
        };
      }
      return acc;
    }, {});
};

export interface TrackBox {
  what: string | null;
  rect: Rectangle;
}

export interface TrackExportOption {
  includeInExportTime: boolean;
  displayInExport: boolean;
  trackId: number;
}

export interface Track {
  id: number;
  start: number;
  end: number;
  numFrames: number;
  positions: [number, Rectangle][] | Region[];
  tags: TrackTag[];
}

export type Rectangle = [number, number, number, number];

export interface Region {
  x: number;
  y: number;
  width: number;
  height: number;
  frameNumber?: number;
  frameTime?: number;
}
export interface SelectedTrack {
  trackId: number;
  start?: number;
  end?: number;
}
