<template>
  <div
    :style="{
      height: `${heightForTracks}px`,
      width: `${canvasWidth}px`,
    }"
    class="track-scrubber"
    key="track-scrubber"
    ref="scrubber"
  >
    <div
      v-for="index in tracks.length"
      :key="index - 1"
      :title="`Track ${index}`"
      :style="{
        background: colours[(index - 1) % colours.length],
        opacity: index - 1 === currentTrack ? 1.0 : 0.5,
        ...trackDimensions[index - 1],
      }"
      class="scrub-track"
    />
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import { Prop, Ref, Watch } from "vue-property-decorator";
import { Track } from "@/CptvPlayerUtils";

const getPositionXForEvent = (event: Event): number => {
  if (event instanceof MouseEvent) {
    return (event as MouseEvent).x;
  } else if (event instanceof TouchEvent) {
    const touch: Touch = (event as TouchEvent).targetTouches[0];
    return (touch && touch.clientX) || 0;
  }
  return 0;
};

const minScrubberHeight = 44;
const trackHeight = 12;

@Component
export default class VideoTracksScrubber extends Vue {
  @Prop({ default: (): Track[] => [] }) tracks!: Track[];
  @Prop({ default: 0 }) duration!: number;
  @Prop({ default: 0 }) currentTrack!: number;
  @Prop({ required: true }) canvasWidth!: number;
  @Prop({ default: 0 }) sidePadding!: number;
  @Prop({ default: 0 }) timeAdjustmentForBackgroundFrame!: number;
  @Prop({ default: () => [] }) colours!: string[];

  trackDimensions: { top: string; left: string; width: string }[] = [];
  @Ref() scrubber!: HTMLDivElement;

  get scrubberWidth(): number {
    return this.canvasWidth - this.sidePadding * 2;
  }
  get heightForTracks(): number {
    if (this.tracks.length === 0) {
      return minScrubberHeight;
    }
    const paddingY = minScrubberHeight / 2 - trackHeight;
    const maxTrackTop = Math.max(
      ...this.trackDimensions.map(({ top }) => Number(top.replace("px", "")))
    );
    return Math.max(44, maxTrackTop + trackHeight + paddingY);
  }

  getWidthForTrack(track: Track): number {
    const trackDuration =
      track.data.end_s -
      this.timeAdjustmentForBackgroundFrame -
      (track.data.start_s - this.timeAdjustmentForBackgroundFrame);
    const ratio = Math.min(1, trackDuration / this.duration);
    return ratio * this.scrubberWidth;
  }
  getOffsetXForTrack(track: Track): number {
    return Math.max(
      this.sidePadding,
      this.getOffsetForTime(
        track.data.start_s - this.timeAdjustmentForBackgroundFrame
      ) + this.sidePadding
    );
  }
  getOffsetYForTrack(trackIndex: number): number {
    // See if there are any gaps to move this up to.
    let topOffset = minScrubberHeight / 2 - trackHeight;
    if (this.tracks.length === 1) {
      return minScrubberHeight / 2 - trackHeight / 2;
    }
    if (trackIndex !== 0) {
      const thisLeft = this.getOffsetXForTrack(this.tracks[trackIndex]);
      const thisRight =
        thisLeft + this.getWidthForTrack(this.tracks[trackIndex]);
      // Go backwards to find the earliest track that has a right <= our left
      while (Math.max(0, trackIndex) !== 0) {
        const lastTrackDims = this.trackDimensions[trackIndex - 1];
        const prevLeft = Number(lastTrackDims.left.replace("px", ""));
        const prevRight =
          prevLeft + Number(lastTrackDims.width.replace("px", ""));
        topOffset = Number(lastTrackDims.top.replace("px", ""));
        const overlapsPrev = prevRight > thisRight || thisLeft < prevRight;
        if (overlapsPrev) {
          topOffset += trackHeight + 1;
          break;
        }
        trackIndex--;
      }
    }
    return topOffset;
  }
  getOffsetForTime(time: number): number {
    const pixelsPerSecond = this.scrubberWidth / this.duration;
    return Math.min(
      this.scrubberWidth,
      this.sidePadding + pixelsPerSecond * time
    );
  }
  pointerMove(event: Event): void {
    event.preventDefault();
    const bounds = this.scrubber.getBoundingClientRect();
    const x = Math.min(
      bounds.width,
      Math.max(0, getPositionXForEvent(event) - bounds.x)
    );
    const timeOffset = x / bounds.width;
    this.$emit("set-playback-time", timeOffset * this.duration);
  }
  pointerEnd(event: Event): void {
    event.preventDefault();
    this.$emit("end-scrub");
    if (event instanceof MouseEvent) {
      window.removeEventListener("mouseup", this.pointerEnd);
      window.removeEventListener("mousemove", this.pointerMove);
    } else if (event instanceof TouchEvent) {
      window.removeEventListener("touchend", this.pointerEnd);
      window.removeEventListener("touchmove", this.pointerMove);
    }
  }
  pointerStart(event: Event): void {
    this.pointerMove(event);
    event.preventDefault();
    this.$emit("start-scrub");
    this.pointerMove(event);
    if (event instanceof MouseEvent) {
      window.addEventListener("mousemove", this.pointerMove);
      window.addEventListener("mouseup", this.pointerEnd);
    } else if (event instanceof TouchEvent) {
      window.addEventListener("touchmove", this.pointerMove, {
        passive: false,
      });
      window.addEventListener("touchend", this.pointerEnd, {
        passive: false,
      });
    }
  }
  initScrubber(): void {
    if (this.scrubber) {
      this.scrubber.addEventListener("touchstart", this.pointerStart, {
        passive: false,
      });
      this.scrubber.addEventListener("mousedown", this.pointerStart, {
        passive: false,
      });
    }
  }
  tearDownScrubber(): void {
    if (this.scrubber) {
      this.scrubber.removeEventListener("touchstart", this.pointerStart);
      this.scrubber.removeEventListener("mousedown", this.pointerStart);
      window.removeEventListener("touchend", this.pointerEnd);
      window.removeEventListener("touchmove", this.pointerMove);
    }
  }
  initTrackDimensions(): void {
    // Init track dimensions
    this.trackDimensions = [];
    for (let i = 0; i < this.tracks.length; i++) {
      this.trackDimensions.push({
        top: `${this.getOffsetYForTrack(i)}px`,
        width: `${this.getWidthForTrack(this.tracks[i])}px`,
        left: `${this.getOffsetXForTrack(this.tracks[i])}px`,
      });
    }
  }
  created(): void {
    this.initTrackDimensions();
  }
  @Watch("duration")
  onDurationChanged(): void {
    this.initTrackDimensions();
  }
  @Watch("tracks")
  onTracksChanged(): void {
    this.initTrackDimensions();
  }
  @Watch("canvasWidth")
  onWidthChanged(): void {
    this.initTrackDimensions();
  }
  mounted(): void {
    this.initScrubber();
  }
  beforeDestroy(): void {
    this.tearDownScrubber();
  }
}
</script>

<style scoped lang="scss">
.track-scrubber {
  background: #2b333f;
  transition: height 0.3s;
  /* Above the motion paths canvas if it exists */
  z-index: 810;
  box-shadow: 0 1px 5px #000 inset;
  cursor: col-resize;
}
.scrub-track {
  transition: opacity 0.3s linear;
  height: 12px;
  border-radius: 5px;
  position: absolute;
}
</style>