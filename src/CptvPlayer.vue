<template>
  <div :class="['cptv-player', { 'stand-alone': standAlone }]">
    <div key="container" class="video-container" ref="container">
      <canvas
        key="base"
        ref="canvas"
        :class="['video-canvas', { smoothed: smoothed }]"
      />
      <canvas key="overlay" ref="overlayCanvas" class="overlay-canvas" />
      <span
        key="messaging"
        :class="['player-messaging', { show: playerMessage !== null }]"
        v-html="playerMessage"
      />
      <span
        key="px-value"
        v-show="showValueInfo"
        ref="valueTooltip"
        class="value-tooltip"
        >{{ valueUnderCursor }}
      </span>
      <div
        key="openUserFile"
        class="playback-controls show"
        v-if="openUserDefinedCptvFile && userFiles"
      >
        <b-form-file
          class="cptv-drop-area"
          accept=".cptv"
          v-model="userSuppliedFile"
          :state="userSuppliedFile !== null"
          placeholder="Choose a CPTV file or drop one here..."
          drop-placeholder="Drop file here..."
        />
      </div>
      <div
        key="buffering"
        :class="[
          'playback-controls',
          { show: isBuffering && (!openUserDefinedCptvFile || !userFiles) },
        ]"
      >
        <font-awesome-icon class="fa-spin buffering" icon="spinner" size="4x" />
      </div>
      <div
        key="playback-controls"
        :class="[
          'playback-controls',
          {
            show: atEndOfPlayback && !extLoading && !openUserDefinedCptvFile,
          },
        ]"
      >
        <button
          @click="requestPrevRecording"
          :class="{ disabled: !canGoBackwards }"
          v-if="!standAlone"
        >
          <font-awesome-icon icon="backward" class="replay" />
        </button>
        <button
          v-if="standAlone && !cptvUrl"
          @click="openUserDefinedCptvFile = true"
        >
          <font-awesome-icon icon="folder-open" class="replay" />
        </button>
        <button @click="togglePlayback">
          <font-awesome-icon icon="redo-alt" class="replay" rotation="270" />
        </button>
        <button
          @click="requestNextRecording"
          :class="{ disabled: !canGoForwards }"
          v-if="!standAlone"
        >
          <font-awesome-icon icon="forward" class="replay" />
        </button>
      </div>
    </div>
    <div key="playback-nav" class="playback-nav">
      <button
        @click="togglePlayback"
        ref="playPauseButton"
        :data-tooltip="playing ? 'Pause' : 'Play'"
        :disabled="!hasVideo"
      >
        <font-awesome-icon v-if="!playing" icon="play" />
        <font-awesome-icon v-else icon="pause" />
      </button>
      <div class="right-nav">
        <div
          :class="['advanced-controls', { open: showAdvancedControls }]"
          v-if="canUseAdvancedControls"
        >
          <button
            @click="toggleAdvancedControls"
            class="advanced-controls-btn"
            :data-tooltip="showAdvancedControls ? 'Show less' : 'Show more'"
            ref="advancedControlsButton"
          >
            <font-awesome-icon
              icon="angle-right"
              :rotation="showAdvancedControls ? null : 180"
            />
          </button>
          <button
            @click="toggleDebugTools"
            ref="debugTools"
            data-tooltip="Debug tools"
            :class="{ selected: showDebugTools }"
          >
            <font-awesome-icon icon="wrench" />
          </button>
          <button
            @click="toggleSmoothing"
            ref="toggleSmoothingButton"
            :data-tooltip="smoothed ? 'Disable smoothing' : 'Enable smoothing'"
            :disabled="!hasVideo"
          >
            <svg
              v-if="smoothed"
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 18 18"
              width="16"
              height="20"
            >
              <g transform="matrix(1,0,0,1,0,-249)" fill="currentColor">
                <path
                  d="M5.25,248.969L5.25,251.781C5.25,252.247 4.872,252.625 4.406,252.625L0.844,252.625C0.378,252.625 0,252.247 0,251.781L0,248.969C0,248.503 0.378,248.125 0.844,248.125L4.406,248.125C4.872,248.125 5.25,248.503 5.25,248.969Z"
                  style="fill-opacity: 0.25"
                />
                <path
                  d="M11.625,257.406L11.625,254.594C11.625,254.128 11.247,253.75 10.781,253.75L7.219,253.75C6.753,253.75 6.375,254.128 6.375,254.594L6.375,257.406C6.375,257.872 6.753,258.25 7.219,258.25L10.781,258.25C11.247,258.25 11.625,257.872 11.625,257.406Z"
                />
                <path
                  d="M12.75,248.969L12.75,251.781C12.75,252.247 13.128,252.625 13.594,252.625L17.156,252.625C17.622,252.625 18,252.247 18,251.781L18,248.969C18,248.503 17.622,248.125 17.156,248.125L13.594,248.125C13.128,248.125 12.75,248.503 12.75,248.969Z"
                  style="fill-opacity: 0.8"
                />
                <path
                  d="M11.625,251.781L11.625,248.969C11.625,248.503 11.247,248.125 10.781,248.125L7.219,248.125C6.753,248.125 6.375,248.503 6.375,248.969L6.375,251.781C6.375,252.247 6.753,252.625 7.219,252.625L10.781,252.625C11.247,252.625 11.625,252.247 11.625,251.781Z"
                  style="fill-opacity: 0.5"
                />
                <path
                  d="M4.406,253.75L0.844,253.75C0.378,253.75 0,254.128 0,254.594L0,257.406C0,257.872 0.378,258.25 0.844,258.25L4.406,258.25C4.872,258.25 5.25,257.872 5.25,257.406L5.25,254.594C5.25,254.128 4.872,253.75 4.406,253.75Z"
                  style="fill-opacity: 0.5"
                />
                <path
                  d="M0,260.219L0,263.031C0,263.497 0.378,263.875 0.844,263.875L4.406,263.875C4.872,263.875 5.25,263.497 5.25,263.031L5.25,260.219C5.25,259.753 4.872,259.375 4.406,259.375L0.844,259.375C0.378,259.375 0,259.753 0,260.219Z"
                  style="fill-opacity: 0.8"
                />
                <path
                  d="M13.594,258.25L17.156,258.25C17.622,258.25 18,257.872 18,257.406L18,254.594C18,254.128 17.622,253.75 17.156,253.75L13.594,253.75C13.128,253.75 12.75,254.128 12.75,254.594L12.75,257.406C12.75,257.872 13.128,258.25 13.594,258.25Z"
                />
                <path
                  d="M13.594,263.875L17.156,263.875C17.622,263.875 18,263.497 18,263.031L18,260.219C18,259.753 17.622,259.375 17.156,259.375L13.594,259.375C13.128,259.375 12.75,259.753 12.75,260.219L12.75,263.031C12.75,263.497 13.128,263.875 13.594,263.875Z"
                />
                <path
                  d="M6.375,260.219L6.375,263.031C6.375,263.497 6.753,263.875 7.219,263.875L10.781,263.875C11.247,263.875 11.625,263.497 11.625,263.031L11.625,260.219C11.625,259.753 11.247,259.375 10.781,259.375L7.219,259.375C6.753,259.375 6.375,259.753 6.375,260.219Z"
                />
              </g>
            </svg>

            <svg v-else width="16" height="18" viewBox="0 0 18 18">
              <g transform="matrix(1,0,0,1,0,-2)" fill="currentColor">
                <path
                  d="M1.294,16.976L18.709,17.063L18.853,0.932C9.155,0.932 1.294,7.279 1.294,16.976Z"
                />
              </g>
            </svg>
          </button>
          <button
            @click="incrementPalette"
            ref="cyclePalette"
            data-tooltip="Cycle colour map"
            :disabled="!hasVideo"
          >
            <font-awesome-icon icon="palette" />
          </button>
          <button
            :disabled="!hasVideo"
            @click="showHeaderInfo"
            data-tooltip="Show recording header info"
            :class="{ selected: displayHeaderInfo }"
            ref="showHeader"
          >
            <font-awesome-icon icon="info-circle" />
          </button>
        </div>
        <button
          :disabled="!hasVideo"
          @click="incrementSpeed"
          ref="cyclePlaybackSpeed"
          class="playback-speed"
          data-tooltip="Cycle playback speed"
        >
          <span>{{ speedMultiplier }}x</span>
        </button>
      </div>
    </div>
    <div key="debug-nav" :class="['debug-tools', { open: showDebugTools }]">
      <div class="debug-info">
        <div ref="frameNumField"></div>
        <div ref="ffcSecsAgo"></div>
      </div>
      <!--      <button-->
      <!--        @click="toggleHistogram"-->
      <!--        ref="toggleHistogramButton"-->
      <!--        :disabled="!hasVideo"-->
      <!--        :data-tooltip="showingHistogram ? 'Hide histogram' : 'Show histogram'"-->
      <!--      >-->
      <!--        <font-awesome-icon icon="chart-bar" />-->
      <!--      </button>-->
      <div>
        <button
          @click="stepBackward"
          data-tooltip="Go back one frame"
          ref="stepBackward"
          :disabled="!hasVideo"
        >
          <font-awesome-icon icon="step-backward" />
        </button>
        <button
          @click="stepForward"
          data-tooltip="Go forward one frame"
          ref="stepForward"
          :disabled="!hasVideo"
        >
          <font-awesome-icon icon="step-forward" />
        </button>
        <button
          @click="togglePicker"
          :disabled="!hasVideo"
          :class="{ selected: showValueInfo }"
          :data-tooltip="
            showValueInfo
              ? 'Disable picker'
              : 'Show raw pixel values under cursor'
          "
          ref="toggleValuePicker"
        >
          <font-awesome-icon icon="eye-dropper" />
        </button>
        <button
          :disabled="!hasVideo || !hasBackgroundFrame"
          ref="showBackgroundFrame"
          :class="{ selected: isShowingBackgroundFrame }"
          data-tooltip="Press to show background frame"
          @click="toggleBackground"
        >
          <font-awesome-icon icon="image" />
        </button>
        <button
          v-if="standAlone || userSuppliedFile"
          ref="exportMp4"
          :disabled="!hasVideo"
          data-tooltip="Export Mp4"
          @click="() => exportMp4()"
        >
          <font-awesome-icon icon="file-video" />
        </button>
      </div>
    </div>
    <div class="tracks-container">
      <VideoTracksScrubber
        :class="{ 'ended-playback': ended }"
        ref="scrubber"
        key="scrubber"
        :duration="actualDuration"
        :tracks="tracks"
        :colours="colours"
        :time-adjustment-for-background-frame="timeAdjustmentForBackgroundFrame"
        :current-track-index="
          currentTrack &&
          tracks.findIndex((track) => track.id === currentTrack.id)
        "
        :canvas-width="canvasWidth"
        :side-padding="scrubberSidePadding"
        @start-scrub="startScrub"
        @end-scrub="endScrub"
        @set-playback-time="setTimeAndRedraw"
      />
      <canvas
        key="playhead"
        ref="playhead"
        class="playhead"
        :width="canvasWidth * devicePixelRatio"
        height="1"
      />
    </div>
    <b-modal v-model="displayHeaderInfo" title="Recording metadata" hide-footer>
      <pre v-if="header">{{ headerInfo }}</pre>
    </b-modal>
    <b-modal v-model="showAtEndOfSearch" title="No more recordings" hide-footer>
      <p>
        You've reached the end of the recordings for the current search results.
      </p>
    </b-modal>
    <b-modal
      v-model="isExporting"
      title="Exporting video"
      no-close-on-backdrop
      no-close-on-esc
      hide-footer
      hide-header-close
      centered
    >
      <b-progress :value="exportProgress * 100" max="100" animated />
      <div class="progress-text">{{ Math.round(exportProgress * 100) }}%</div>
      <div class="progress-text">
        <b-button
          class="cancel-export-button"
          variant="outline-danger"
          @click="cancelExport"
          >Cancel</b-button
        >
      </div>
    </b-modal>
    <b-modal
      title="Export options"
      v-model="showAdvancedExportOptions"
      ok-title="Export"
      @ok="exportMp4(trackExportOptions)"
      @cancel="$emit('export-complete')"
    >
      <b-form-group label="Include tracks in exported timespan">
        <b-form-checkbox
          v-for="(track, index) in trackExportOptions"
          :key="index"
          v-model="track.includeInExportTime"
          >Track {{ index + 1 }}</b-form-checkbox
        >
      </b-form-group>
      <b-form-group label="Display track boxes in export">
        <b-form-checkbox
          v-for="(track, index) in trackExportOptions"
          :key="index"
          v-model="track.displayInExport"
          >Track {{ index + 1 }}</b-form-checkbox
        >
      </b-form-group>
    </b-modal>
    <b-modal v-model="hasStreamLoadError">{{ streamLoadError }}</b-modal>
  </div>
</template>
<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import VideoTracksScrubber from "./VideoTracksScrubber.vue";
import {
  CptvFrame,
  CptvFrameHeader,
  CptvHeader,
  CptvDecoder,
} from "cptv-decoder";
import {
  renderFrameIntoFrameBuffer,
  getFrameIndexAtTime,
  ColourMaps,
} from "cptv-decoder/frameRenderUtils";
import {
  Rectangle,
  PlaybackSpeeds,
  formatTime,
  formatHeaderInfo,
  TrackTag,
  SelectedTrack,
  Track,
  TrackExportOption,
  TrackBox,
  getProcessedTracks,
} from "./CptvPlayerUtils";
import FontAwesomeIcon from "./icons";
import { Prop, Ref, Watch } from "vue-property-decorator";
import {
  BModal,
  VBModal,
  BButton,
  BFormCheckbox,
  BFormGroup,
  BFormFile,
  BProgress,
} from "bootstrap-vue";
import { Mp4Encoder } from "./mp4-export";

const download = (url: string, filename: string) => {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename || "download";
  anchor.click();
};

let lastCptvUrl: string | null = null;
let frameBuffer: Uint8ClampedArray;
let frames: CptvFrame[] = [];
let cptvDecoder: CptvDecoder;

@Component({
  components: {
    VideoTracksScrubber,
    FontAwesomeIcon,
    BModal,
    BFormGroup,
    BButton,
    BFormCheckbox,
    BFormFile,
    BProgress,
  },
  directives: {
    "b-modal": VBModal,
  },
})
export default class CptvPlayerComponent extends Vue {
  @Prop({ default: false }) extLoading!: boolean;
  @Prop({ default: null }) cptvUrl!: string | null;
  @Prop({ default: null }) cptvSize!: number | null;
  @Prop({ default: (): string[] => [] }) colours!: string[];
  @Prop({ default: true }) canSelectTracks!: boolean;
  @Prop({ default: false }) showOverlaysForCurrentTrackOnly!: boolean;
  @Prop({ default: false }) standAlone!: boolean;
  @Prop({ default: (): Track[] => [] }) tracks!: Track[];
  @Prop() currentTrack?: Track;
  @Prop({ default: null }) knownDuration!: number | null;
  @Prop({ default: null }) recordingId!: number | null;
  @Prop({ default: null }) recentlyAddedTag!: TrackTag | null;
  @Prop({ default: false }) canGoBackwards!: boolean;
  @Prop({ default: false }) canGoForwards!: boolean;
  @Prop({ default: false }) exportRequested!: boolean | string;
  @Prop({ default: true }) canUseAdvancedControls!: boolean;
  @Prop({ default: true }) userFiles!: boolean;

  @Ref() container!: HTMLDivElement;
  @Ref() canvas!: HTMLCanvasElement;
  @Ref() overlayCanvas!: HTMLCanvasElement;
  @Ref() playhead!: HTMLCanvasElement;
  @Ref() valueTooltip!: HTMLElement;
  @Ref() frameNumField: HTMLDivElement | undefined;
  @Ref() ffcSecsAgo: HTMLDivElement | undefined;

  openUserDefinedCptvFile = true;
  userSuppliedFile: File | null = null;
  header: CptvHeader | null = null;
  frameHeader: CptvFrameHeader | null = null;
  atEndOfPlayback = false;
  canvasWidth = 800;
  canvasHeight = 600;
  showAtEndOfSearch = false;
  isScrubbing = false;
  ended = false;
  smoothed = true;
  showValueInfo = false;
  isShowingBackgroundFrame = false;
  internalFrameNum = 0;
  animationTick = 0;
  speedMultiplierIndex = 1;
  paletteIndex = 0;
  animationFrame: number | null = null;
  messageAnimationFrame: number | null = null;
  playing = false;
  stopAtFrame: number | null = null;
  wasPaused = true;
  internalTotalFrames: number | null = null;
  internalLoadedFrames = 0;
  colourMap: [string, Uint32Array] = ColourMaps[0];
  showAdvancedControls = false;
  showDebugTools = false;
  displayHeaderInfo = false;
  loadProgress = 0;
  playerMessage: string | null = null;
  messageTimeout: null | number = null;
  valueUnderCursor: string | null = null;
  buffering = false;
  seekingInProgress = false;
  isExporting = false;
  exportProgress = 0;
  showingHistogram = false;
  globalClampedMin: number | undefined = undefined;
  loadedStream: boolean | string = false;
  streamLoadError: string | null = null;
  scrubberSidePadding = 1;
  devicePixelRatio = 1;
  windowWidth: number = window.innerWidth;
  showAdvancedExportOptions = false;
  minValue: number = Number.MAX_VALUE;
  maxValue: number = Number.MIN_VALUE;
  trackExportOptions: TrackExportOption[] = [];
  scale = 1;

  set frameNum(num: number) {
    this.internalFrameNum = num;
    // if (this.totalFrames !== null) {
    //   this.internalFrameNum = num;
    //   // if (this.hasBackgroundFrame) {
    //   //   this.internalFrameNum = Math.max(0, Math.min(this.totalFrames, num));
    //   // } else {
    //   //   this.internalFrameNum = Math.max(0, Math.min(this.totalFrames, num));
    //   // }
    // } else {
    //   this.internalFrameNum = num;
    // }
  }
  get frameNum(): number {
    return this.internalFrameNum;
    // if (this.totalFrames !== null) {
    //   return Math.min(this.internalFrameNum, this.totalFrames);
    // }
    // return this.internalFrameNum;
  }
  get totalFrames(): number | null {
    return this.internalTotalFrames;
  }
  set totalFrames(num: number | null) {
    this.internalTotalFrames = num;
  }
  get loadedFrames(): number {
    // return this.hasBackgroundFrame
    //   ? this.internalLoadedFrames - 1
    //   : this.internalLoadedFrames;
    return this.internalLoadedFrames;
  }
  set loadedFrames(num: number) {
    this.internalLoadedFrames = num;
  }
  get isBuffering(): boolean {
    return this.extLoading || this.buffering;
  }
  get scrubberWidth(): number {
    return this.canvasWidth - this.scrubberSidePadding * 2;
  }
  get afterAnyTracks(): boolean {
    return !this.atEndOfPlayback;
  }
  get playheadOffsetForCurrentTime(): number {
    const pixelsPerSecond = this.scrubberWidth / this.actualDuration;
    return (
      this.scrubberSidePadding +
      Math.min(this.scrubberWidth, pixelsPerSecond * this.currentTime60fps)
    );
  }
  get hasStreamLoadError(): boolean {
    return this.streamLoadError !== null;
  }
  set hasStreamLoadError(val: boolean) {
    if (!val) {
      this.streamLoadError = null;
    }
  }
  get processedTracks(): Record<number, Record<number, TrackBox>> {
    return getProcessedTracks(
      this.tracks,
      this.timeAdjustmentForBackgroundFrame,
      this.frameTimeSeconds
    );
  }
  get actualDuration(): number {
    if (this.header !== null) {
      const fps = this.header.fps;
      if (this.totalFrames !== null) {
        return (
          (this.totalFrames - 1 - (this.header.hasBackgroundFrame ? 1 : 0)) /
          fps
        );
      }
      if (this.knownDuration === null && this.loadedFrames) {
        return (this.loadedFrames - 1) / fps;
      }
    }
    return Math.max(
      ...this.tracks.map(
        (track) => track.end - this.timeAdjustmentForBackgroundFrame
      ),
      this.duration - this.timeAdjustmentForBackgroundFrame
    );
  }
  get timeAdjustmentForBackgroundFrame(): number {
    if (this.hasBackgroundFrame) {
      return this.frameTimeSeconds;
    }
    return 0;
  }
  get hasBackgroundFrame(): boolean {
    return (
      (this.header && (this.header.hasBackgroundFrame as boolean)) || false
    );
  }
  get duration(): number {
    return this.knownDuration || 0;
  }
  get currentTime60fps(): number {
    if (this.header) {
      const holdForXFrames = Math.ceil(
        60 / ((this.header.fps as number) * this.speedMultiplier)
      );
      const tick = Math.max(0, this.animationTick - 1);
      const adjustment =
        (tick % holdForXFrames) * (1 / holdForXFrames / holdForXFrames);
      return this.currentTime + adjustment;
    }
    return 0;
  }
  get frameTimeSeconds(): number {
    if (this.header) {
      return 1 / (this.header.fps as number);
    }
    return 1 / 9;
  }
  get elapsedTime(): string {
    return formatTime(this.currentTime);
  }
  get currentTime(): number {
    if (this.header) {
      const totalTime = this.actualDuration;
      const totalFramesEstimate = totalTime * (this.header.fps as number);
      return (this.frameNum / totalFramesEstimate) * totalTime;
    }
    return 0;
  }
  get ambientTemperature(): string | false {
    if (this.frameHeader && this.frameHeader.frameTempC) {
      return `About ${Math.round(this.frameHeader.frameTempC)}ºC`;
    }
    return false;
  }
  get secondsSinceLastFFC(): number | null {
    if (this.frameHeader && this.frameHeader.lastFfcTimeMs) {
      return (
        (this.frameHeader.timeOnMs - this.frameHeader.lastFfcTimeMs) / 1000
      );
    }
    return null;
  }
  get speedMultiplier(): number {
    return PlaybackSpeeds[this.speedMultiplierIndex];
  }
  get headerInfo(): string | null {
    return formatHeaderInfo(this.header);
  }
  get exportOptions(): TrackExportOption[] {
    return this.tracks.map(({ id }) => ({
      includeInExportTime: true,
      displayInExport: true,
      trackId: id,
    }));
  }
  get hasVideo(): boolean {
    return !(this.cptvUrl === null && this.userSuppliedFile === null);
  }
  created(): void {
    // Restore user preferences
    const smoothingPreference = window.localStorage.getItem("video-smoothing");
    if (smoothingPreference) {
      this.smoothed = smoothingPreference === "true";
    }
    const palettePreference = window.localStorage.getItem("video-palette");
    if (palettePreference) {
      this.paletteIndex = ColourMaps.findIndex(
        ([name]) => name === palettePreference
      );
      this.colourMap = ColourMaps[this.paletteIndex];
    }
    const playbackSpeed = window.localStorage.getItem("video-playback-speed");
    if (playbackSpeed) {
      this.speedMultiplierIndex = PlaybackSpeeds.findIndex(
        (mul) => mul === Number(playbackSpeed)
      );
    }
    const showDebugTools = window.localStorage.getItem("show-debug-tools");
    if (showDebugTools) {
      this.showDebugTools = showDebugTools === "true";
    }
  }

  async mounted(): Promise<void> {
    cptvDecoder = new CptvDecoder();
    // This makes button active styles work in safari iOS.
    document.addEventListener("touchstart", this.dismissAnyTooltips, false);

    this.canvas.width = 160;
    this.canvas.height = 120;

    window.addEventListener("resize", this.onResize);
    if (window.matchMedia) {
      // NOTE This is only needed for multi-monitor setups where the DPI can change if the window is moved
      //  between screens of differing DPIs.  iOS 12 and lower don't support this.
      const match = window.matchMedia("screen and (min-resolution: 1.1dppx)");
      match.addEventListener &&
        match.addEventListener("change", this.setCanvasDimensions);
    }

    this.setCanvasDimensions();
    this.buffering = true;
    if (this.canSelectTracks) {
      this.overlayCanvas.addEventListener("click", this.clickOverlayCanvas);
      this.overlayCanvas.addEventListener(
        "mousemove",
        this.moveOverOverlayCanvas
      );
    }
    if (lastCptvUrl !== this.cptvUrl) {
      await this.initPlayer();
    } else {
      this.clearCanvas();
    }
    this.initTrackExportOptions();
  }
  async beforeDestroy(): Promise<void> {
    document.removeEventListener("touchstart", this.dismissAnyTooltips, false);
    this.loadedStream = false;
    this.clearCanvas();
    if (this.canSelectTracks) {
      this.overlayCanvas.removeEventListener("click", this.clickOverlayCanvas);
      this.overlayCanvas.removeEventListener(
        "mousemove",
        this.moveOverOverlayCanvas
      );
    }
    window.removeEventListener("resize", this.onResize);
    if (window.matchMedia) {
      const match = window.matchMedia("screen and (min-resolution: 2dppx)");
      match.removeEventListener &&
        match.removeEventListener("change", this.setCanvasDimensions);
    }
    cancelAnimationFrame(this.animationFrame as number);
    await cptvDecoder.close();
    frames = [];
  }

  async ensureEntireFileIsLoaded(): Promise<void> {
    while (!this.totalFrames) {
      const frame = await cptvDecoder.getNextFrame();
      if (frame === null) {
        break;
      }
      this.totalFrames = await cptvDecoder.getTotalFrames();
      if (!this.totalFrames) {
        frames.push(frame);
      }
      this.loadedFrames = frames.length;
    }
    if (!this.totalFrames) {
      this.totalFrames = frames.length;
    }
  }

  @Watch("exportRequested")
  async onExportRequested(): Promise<void> {
    if (this.exportRequested) {
      if (
        this.tracks &&
        this.tracks.length &&
        this.exportRequested === "advanced"
      ) {
        this.showAdvancedExportOptions = true;
        this.initTrackExportOptions();
      } else {
        await this.exportMp4();
      }
    }
  }

  @Watch("userSuppliedFile")
  async onUserSuppliedFileChanged(): Promise<void> {
    if (this.userSuppliedFile !== null) {
      this.openUserDefinedCptvFile = false;
      this.buffering = true;
      const buffer = await this.userSuppliedFile.arrayBuffer();
      await this.initPlayer();
      await this.loadCptvFile(new Uint8Array(buffer), false);
      await this.ensureEntireFileIsLoaded();
      if (await cptvDecoder.hasStreamError()) {
        this.streamLoadError = await cptvDecoder.getStreamError();
        cptvDecoder && (await cptvDecoder.free());
        this.buffering = false;
        // Still allow truncated files to play if they have frames, but show an error message.
        if (this.totalFrames && this.totalFrames > 1) {
          await this.play();
        } else {
          this.openUserDefinedCptvFile = true;
        }
        return;
      }
      this.buffering = false;
      await this.play();
    } else {
      this.openUserDefinedCptvFile = true;
    }
  }

  @Watch("currentTrack")
  onCurrentTrack(): void {
    if (this.playing) {
      this.selectTrack(true);
    } else {
      this.selectTrack(true, true);
      this.animationTick = 0;
      cancelAnimationFrame(this.animationFrame as number);
      this.renderOverlay(
        this.overlayCanvas.getContext("2d"),
        this.scale,
        this.secondsSinceLastFFC,
        false,
        this.frameNum
      );
    }
  }
  @Watch("recentlyAddedTag")
  onRecentlyAddedTag(): void {
    // Update the box label for a recently added tag
    this.renderOverlay(
      this.overlayCanvas.getContext("2d"),
      this.scale,
      this.secondsSinceLastFFC,
      false,
      this.frameNum
    );
  }
  @Watch("cptvUrl")
  onCptvUrl(): void {
    if (this.cptvUrl !== lastCptvUrl) {
      this.initPlayer();
    }
  }
  @Watch("tracks")
  onTracks(): void {
    this.trackExportOptions = this.exportOptions;
  }

  dismissAnyTooltips(): void {
    this.$root.$emit("bv::hide::tooltip");
  }
  initTrackExportOptions(): void {
    this.trackExportOptions = this.exportOptions;
  }
  firstFrameForTrack(trackId: number): number {
    const frameForTrack = Object.entries(
      this.processedTracks
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ).find(([_, tracks]) => Object.keys(tracks).map(Number).includes(trackId));
    return (frameForTrack && Number(frameForTrack[0])) || 0;
  }
  onePastLastFrameForTrack(trackId: number): number {
    const entries = Object.entries(this.processedTracks);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const firstFrameForTrackIndex = entries.findIndex(([_, tracks]) =>
      Object.keys(tracks).map(Number).includes(trackId)
    );
    const fromStartOfTrack = entries.slice(firstFrameForTrackIndex);
    let onePastLastFrameForTrackIndex = fromStartOfTrack.findIndex(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, tracks]) => !Object.keys(tracks).map(Number).includes(trackId)
    );
    if (onePastLastFrameForTrackIndex === -1) {
      onePastLastFrameForTrackIndex = fromStartOfTrack.length;
    }
    const lastFrameForTrack =
      fromStartOfTrack[onePastLastFrameForTrackIndex - 1];
    if (this.totalFrames !== null) {
      return Math.min(
        this.totalFrames,
        (lastFrameForTrack && Number(lastFrameForTrack[0])) || 0
      );
    } else {
      return (lastFrameForTrack && Number(lastFrameForTrack[0])) || 0;
    }
  }
  async initPlayer(): Promise<void> {
    this.loadedStream = false;
    this.streamLoadError = null;
    this.clearCanvas();
    this.atEndOfPlayback = false;
    this.frameNum = 0;
    this.header = null;
    this.setFrameInfo(0);
    this.ended = false;
    this.animationTick = 0;
    this.loadedFrames = 0;
    this.totalFrames = null;
    this.loadProgress = 0;
    this.playing = true;
    this.wasPaused = true;
    this.canvas.width = 160;
    this.canvas.height = 120;
    this.minValue = Number.MAX_VALUE;
    this.maxValue = Number.MIN_VALUE;
    this.trackExportOptions = [];
    frames = [];
    cancelAnimationFrame(this.animationFrame as number);
    if (this.cptvUrl !== null) {
      this.openUserDefinedCptvFile = false;
      await this.loadCptvFile();
    }
  }
  async loadCptvFile(
    localFile: Uint8Array | null = null,
    playImmediately = true
  ): Promise<void> {
    if (!localFile) {
      if (this.cptvUrl) {
        this.loadedStream = await cptvDecoder.initWithCptvUrlAndKnownSize(
          this.cptvUrl,
          this.cptvSize || 0
        );
      }
    } else {
      this.loadedStream = await cptvDecoder.initWithLocalCptvFile(localFile);
    }
    if (typeof this.loadedStream === "string") {
      if (this.loadedStream === "Failed to verify JWT.") {
        window.location.reload();
      } else {
        this.streamLoadError = this.loadedStream;
        if (await cptvDecoder.hasStreamError()) {
          await cptvDecoder.free();
          frames = [];
          this.openUserDefinedCptvFile = true;
          this.buffering = false;
        }
      }
    } else if (this.loadedStream) {
      lastCptvUrl = this.cptvUrl;
      this.header = Object.freeze(await cptvDecoder.getHeader());
      this.setFrameInfo(0);
      this.scale = this.canvasWidth / this.header.width;
      this.$emit("ready-to-play", this.header);
      frameBuffer = new Uint8ClampedArray(
        this.header.width * this.header.height * 4
      );
      this.canvas.width = this.header.width;
      this.canvas.height = this.header.height;
      cancelAnimationFrame(this.animationFrame as number);
      if (playImmediately) {
        await this.fetchRenderAdvanceFrame();
        this.buffering = false;
      }
    }
  }
  getFrameAtIndex(i: number): CptvFrame {
    const frameIndex = this.hasBackgroundFrame
      ? Math.min(frames.length - 1, i + 1)
      : Math.min(frames.length - 1, i);
    //console.log("Asking for frame index", i);
    //console.log("Getting actual frame index", frameIndex);
    const frame = frames[frameIndex];
    // We keep a running tally of min/max values across the clip for
    // normalisation purposes.
    const minValue = frame.meta.imageData.min;
    const maxValue = frame.meta.imageData.max;
    // Values within 5 seconds of an FFC event do not contribute to this.
    const withinFfcTimeout =
      frame.meta.lastFfcTimeMs &&
      frame.meta.timeOnMs - frame.meta.lastFfcTimeMs < 5000;
    if (minValue !== 0 && (frame.meta.isBackgroundFrame || !withinFfcTimeout)) {
      // If the minimum value is zero, it's probably a glitched frame.
      this.minValue = Math.min(this.minValue, minValue);
      this.maxValue = Math.max(this.maxValue, maxValue);
      const AVERAGE_HEADROOM_OVER_BACKGROUND = 300;
      this.maxValue = Math.max(
        Math.max(this.maxValue, maxValue),
        Math.min(1 << 16, this.minValue + AVERAGE_HEADROOM_OVER_BACKGROUND)
      );
    }
    return frame;
  }
  selectTrack(force = false, shouldPlay = false): void {
    if (this.currentTrack && (!this.playing || force)) {
      if (this.currentTrack.start !== undefined) {
        if (this.processedTracks) {
          cancelAnimationFrame(this.animationFrame as number);
          this.animationTick = 0;
          this.setTimeAndRedraw(
            -1,
            this.firstFrameForTrack(this.currentTrack.id)
          );
          if (shouldPlay) {
            this.play();
          }
        }
      }
      if (this.currentTrack.end !== undefined) {
        // This is used when a user selects a track from the TrackInfo panel.
        // In that case we don't want it selecting another track as it plays on from
        // the selected track, since the user likely wants to tag the track they selected.

        // Any other further user interaction should unset stopAtTime.
        this.stopAtFrame = this.onePastLastFrameForTrack(this.currentTrack.id);
      } else {
        this.stopAtFrame = null;
      }
    }
  }
  toggleHistogram(): void {
    this.showingHistogram = !this.showingHistogram;
  }
  async stepForward(): Promise<void> {
    this.isShowingBackgroundFrame = false;
    this.pause();
    this.animationTick = 0;
    const canAdvance = await this.renderCurrentFrame(true, this.frameNum + 1);
    if (canAdvance) {
      this.frameNum++;
    }
    if (this.header && this.totalFrames !== null) {
      this.atEndOfPlayback = this.frameNum === this.totalFrames - 1;
    } else {
      this.atEndOfPlayback = false;
    }
  }
  async stepBackward(): Promise<void> {
    this.isShowingBackgroundFrame = false;
    this.pause();
    this.animationTick = 0;
    const firstFrame = 0;
    const couldStep = await this.renderCurrentFrame(
      true,
      Math.max(this.frameNum - 1, firstFrame)
    );
    if (couldStep) {
      this.frameNum = Math.max(0, this.frameNum - 1);
      this.atEndOfPlayback = false;
    }
  }
  async clickOverlayCanvas(event: MouseEvent): Promise<void> {
    const canvasOffset = this.canvas.getBoundingClientRect();
    const x = event.x - canvasOffset.x;
    const y = event.y - canvasOffset.y;
    const trackId = this.getTrackIdAtPosition(x, y);
    this.overlayCanvas.style.cursor = trackId !== null ? "pointer" : "default";
    if (trackId !== null) {
      await this.renderCurrentFrame();
      this.$emit("track-selected", {
        trackId,
      });
    }
  }
  clearCanvas(): void {
    const canvas = this.canvas as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    context &&
      context.clearRect(
        0,
        0,
        context.canvas.width * (1 / this.devicePixelRatio),
        context.canvas.height * (1 / this.devicePixelRatio)
      );

    const overlayCanvas = this.overlayCanvas as HTMLCanvasElement;
    const overlayContext = overlayCanvas.getContext("2d");
    overlayContext &&
      overlayContext.clearRect(
        0,
        0,
        overlayContext.canvas.width * (1 / this.devicePixelRatio),
        overlayContext.canvas.height * (1 / this.devicePixelRatio)
      );
  }
  moveOverOverlayCanvas(event: MouseEvent): void {
    const canvasOffset = this.canvas.getBoundingClientRect();
    const x = event.x - canvasOffset.x;
    const y = event.y - canvasOffset.y;
    const hitTrackIndex = this.getTrackIdAtPosition(x, y);
    // set cursor
    this.overlayCanvas.style.cursor =
      hitTrackIndex !== null ? "pointer" : "default";
    if (this.showValueInfo && this.header) {
      this.canvas.style.cursor = "default";
      // Map the x,y into canvas size
      const pX = Math.floor(x / this.scale);
      const pY = Math.floor(y / this.scale);
      const frameData = this.isShowingBackgroundFrame
        ? this.getFrameAtIndex(-1)
        : this.getFrameAtIndex(this.frameNum);
      this.valueUnderCursor = `(${pX}, ${pY}) ${
        frameData.data[pY * this.header.width + pX]
      }`;
      if (x > canvasOffset.right - canvasOffset.x - 100) {
        this.valueTooltip.style.left = `${x - 100}px`;
      } else {
        this.valueTooltip.style.left = `${x + 2}px`;
      }
      if (y < canvasOffset.top - canvasOffset.y + 20) {
        this.valueTooltip.style.top = `${y + 20}px`;
      } else {
        this.valueTooltip.style.top = `${y - 20}px`;
      }
    }
  }
  async fetchRenderAdvanceFrame(): Promise<boolean> {
    // Fetch, render, advance
    const canAdvance = await this.renderCurrentFrame();
    if (canAdvance) {
      //console.log("Can advance frame", true);
      return true;
    } else if (this.playing) {
      this.pause();
    }
    return false;
  }
  toggleAdvancedControls(): void {
    this.showAdvancedControls = !this.showAdvancedControls;
  }
  toggleDebugTools(): void {
    this.showDebugTools = !this.showDebugTools;
    window.localStorage.setItem(
      "show-debug-tools",
      this.showDebugTools.toString()
    );
  }
  minMaxForFrame({ meta }: CptvFrame): [number, number] {
    if (meta.isBackgroundFrame) {
      return [this.minValue, this.maxValue];
    }
    const lastFfcTimeMs = meta.lastFfcTimeMs || 1000000;
    const timeSinceLastFFC = (meta.timeOnMs - lastFfcTimeMs) / 1000;
    if (timeSinceLastFFC < 5) {
      // Use frame local min/max
      return [meta.imageData.min, meta.imageData.max];
    }

    return [this.minValue, this.maxValue];
  }
  cancelExport(): void {
    this.exportProgress = 0;
    this.isExporting = false;
  }
  async exportMp4(
    trackExportOptions?: {
      includeInExportTime: boolean;
      displayInExport: boolean;
      trackId: number;
    }[]
  ): Promise<void> {
    if (!this.header) {
      return;
    }

    this.pause();
    this.isExporting = true;
    this.exportProgress = 0;
    const renderCanvas = document.createElement("canvas");
    const targetWidth = 640;
    const targetHeight = 480;
    const encoder = new Mp4Encoder();
    await encoder.init(targetWidth, targetHeight, this.header.fps);
    if (!this.isExporting) {
      encoder.close();
      // Check for cancellation
      return;
    }
    renderCanvas.width = targetWidth;
    renderCanvas.height = targetHeight;
    const context = renderCanvas.getContext("2d");
    const videoCanvas = document.createElement("canvas");
    videoCanvas.width = this.header.width;
    videoCanvas.height = this.header.height;
    const videoContext = videoCanvas.getContext("2d");
    if (videoContext === null || context === null) {
      return;
    }

    // Make sure everything is loaded to ensure that we have final min/max numbers for normalisation
    await this.ensureEntireFileIsLoaded();

    if (await cptvDecoder.hasStreamError()) {
      this.isExporting = false;
      this.streamLoadError = await cptvDecoder.getStreamError();
      await cptvDecoder.free();
      frames = [];
      encoder.close();
      return;
    }

    if (!this.isExporting) {
      encoder.close();
      // Check for cancellation
      return;
    }
    console.assert(this.totalFrames !== null);
    const totalFrames = this.totalFrames || 0;
    let startFrame = 0;
    let onePastLastFrame = totalFrames;
    if (
      trackExportOptions &&
      trackExportOptions.filter((track) => track.includeInExportTime).length !==
        0
    ) {
      startFrame = totalFrames;
      onePastLastFrame = 0;
      for (const { includeInExportTime, trackId } of trackExportOptions) {
        if (includeInExportTime) {
          const track = this.tracks.find((track) => track.id === trackId);
          if (track) {
            const startTrackFrame = this.getFrameAtTime(track.start - 1);
            const endTrackFrame = this.getFrameAtTime(track.end + 1);
            startFrame = Math.min(startFrame, startTrackFrame);
            onePastLastFrame = Math.max(onePastLastFrame, endTrackFrame);
          }
        }
      }
    }
    let frameNum = startFrame;
    while (frameNum < onePastLastFrame) {
      const frameData = this.getFrameAtIndex(frameNum);
      const frameHeader = frameData.meta;
      const [min, max] = this.minMaxForFrame(frameData);
      renderFrameIntoFrameBuffer(
        frameBuffer,
        frameData.data,
        this.colourMap[1],
        min,
        max
      );
      videoContext.putImageData(
        new ImageData(frameBuffer, this.header.width, this.header.height),
        0,
        0
      );
      context.imageSmoothingEnabled = this.smoothed;
      if (this.smoothed) {
        context.imageSmoothingQuality = "high";
      }
      context.drawImage(
        videoCanvas,
        0,
        0,
        videoCanvas.width,
        videoCanvas.height,
        0,
        0,
        renderCanvas.width,
        renderCanvas.height
      );

      // Draw the overlay
      let timeSinceLastFFCSeconds = Number.MAX_SAFE_INTEGER;
      if (frameHeader.lastFfcTimeMs) {
        timeSinceLastFFCSeconds =
          (frameHeader.timeOnMs - frameHeader.lastFfcTimeMs) / 1000;
      }
      this.renderOverlay(
        context,
        renderCanvas.width / videoCanvas.width,
        timeSinceLastFFCSeconds,
        true,
        frameNum,
        trackExportOptions
      );
      await encoder.encodeFrame(
        context.getImageData(0, 0, targetWidth, targetHeight).data
      );
      if (!this.isExporting) {
        encoder.close();
        // Check for cancellation
        return;
      }
      this.exportProgress =
        (frameNum - startFrame) / (onePastLastFrame - startFrame);
      frameNum++;
    }
    const uint8Array = await encoder.finish();
    encoder.close();
    if (!this.isExporting) {
      // Check for cancellation
      return;
    }
    // Reset any export options
    this.initTrackExportOptions();
    const recordingIdSuffix =
      this.recordingId !== null ? `recording_${this.recordingId}__` : "";
    download(
      URL.createObjectURL(new Blob([uint8Array], { type: "video/mp4" })),
      `${recordingIdSuffix}${new Date(
        this.header.timestamp / 1000
      ).toLocaleString()}`
    );
    this.isExporting = false;
    this.$emit("export-complete");
  }
  renderFrame(frameData: CptvFrame, frameNum: number, force = false): void {
    if (this.canvas && this.header) {
      const context = this.canvas.getContext("2d");
      if (!context) {
        return;
      }
      const [min, max] = this.minMaxForFrame(frameData);

      const range = max - min;
      const colourMap = this.colourMap[1];
      const fd = frameData.data;
      const frameBufferView = new Uint32Array(frameBuffer.buffer);
      const len = frameBufferView.length;
      for (let i = 0; i < len; i++) {
        const index = ((fd[i] - min) / range) * 255.0;
        const n = Math.abs(index);
        const f = n << 0;
        const ff = f == n ? f : f + 1;
        frameBufferView[i] = colourMap[ff];
      }

      cancelAnimationFrame(this.animationFrame as number);
      this.animationFrame = requestAnimationFrame(() => {
        if (this.header) {
          this.drawFrame(
            context,
            new ImageData(frameBuffer, this.header.width, this.header.height),
            frameNum || this.frameNum,
            force
          );
        }
      });
    }
  }
  async drawFrame(
    context: CanvasRenderingContext2D,
    imgData: ImageData,
    frameNum: number,
    force = false
  ): Promise<void> {
    if (context && this.header) {
      if (force) {
        this.animationTick = 0;
      }
      // One tick represents 1000 / fps * multiplier
      const everyXTicks = Math.max(
        1,
        Math.floor(60 / (this.header.fps * this.speedMultiplier))
      );
      // NOTE: respect fps here, render only when we should.
      const shouldRedraw =
        (this.animationTick + (this.playing ? 1 : 0)) % everyXTicks === 0;
      //console.log("Should redraw", shouldRedraw, this.animationTick, this.playing);
      if (context && (shouldRedraw || force)) {
        this.setFrameInfo(frameNum);
        //console.log("*** Draw frame to canvas", frameNum);
        //debugger;
        context.putImageData(imgData, 0, 0);
        if (this.overlayCanvas) {
          const overlayContext = this.overlayCanvas.getContext("2d");
          if (overlayContext) {
            this.renderOverlay(
              overlayContext,
              this.scale,
              this.secondsSinceLastFFC,
              false,
              frameNum
            );

            {
              const time = `${this.elapsedTime} / ${formatTime(
                Math.max(this.currentTime, this.actualDuration)
              )}`;
              this.drawBottomRightOverlayLabel(time, overlayContext);
              // Draw time and temperature in
              // overlayContext.
              this.drawBottomLeftOverlayLabel(
                this.ambientTemperature,
                overlayContext
              );
            }
          }
        }
        let didAdvance = false;
        if (this.playing) {
          didAdvance = await this.fetchRenderAdvanceFrame();
        }
        //console.log("Did advance?", didAdvance);
        if (didAdvance) {
          this.animationTick = 0;
          this.frameNum++;
          //console.log("Increment frameNum", this.frameNum);
        } else {
          this.animationTick++;
        }
        // Check if we're at the end:
        if (
          this.header &&
          this.totalFrames &&
          this.frameNum === this.totalFrames
        ) {
          this.pause();
        }
        //console.log("At end of playback?", this.frameNum, this.totalFrames && this.totalFrames - 1);
        if (
          this.header &&
          this.totalFrames &&
          this.frameNum === this.totalFrames - 1
        ) {
          //console.log("At end of playback?", this.frameNum, this.totalFrames - 1);
          this.atEndOfPlayback = true;
        }
      } else if (context) {
        this.animationTick++;
        cancelAnimationFrame(this.animationFrame as number);
        this.animationFrame = requestAnimationFrame(() =>
          this.drawFrame(context, imgData, frameNum)
        );
      }

      // Update playhead:
      const playhead = this.playhead;
      if (playhead) {
        const playheadContext = playhead.getContext("2d");
        if (playheadContext) {
          playheadContext.fillStyle = "rgba(0, 0, 0, 0.35)";
          playheadContext.clearRect(0, 0, playhead.width, playhead.height);
          const playheadX =
            this.playheadOffsetForCurrentTime * this.devicePixelRatio;
          playheadContext.fillRect(0, 0, playheadX, playhead.height);
          playheadContext.lineWidth = this.devicePixelRatio;
          playheadContext.strokeStyle = "white";
          playheadContext.beginPath();
          playheadContext.moveTo(playheadX, 0);
          playheadContext.lineTo(playheadX, playhead.height);
          playheadContext.stroke();
        }
      }

      if (this.playing && this.stopAtFrame) {
        if (this.frameNum === this.stopAtFrame) {
          this.stopAtFrame = null;
          this.pause();
        }
      }
    }
  }
  setFrameInfo(frameNum: number): void {
    if (this.showDebugTools) {
      if (this.frameNumField) {
        this.frameNumField.innerText = `Frame #${frameNum}`;
      }
      if (this.ffcSecsAgo && this.secondsSinceLastFFC) {
        this.ffcSecsAgo.innerText = `FFC ${this.secondsSinceLastFFC.toFixed(
          1
        )}s ago`;
      }
    }
  }
  setLabelFontStyle(overlayContext: CanvasRenderingContext2D): void {
    overlayContext.font = "13px sans-serif";
    overlayContext.lineWidth = 4;
    overlayContext.strokeStyle = "rgba(0, 0, 0, 0.5)";
    overlayContext.fillStyle = "white";
  }
  drawBottomLeftOverlayLabel(
    label: string | false,
    overlayContext: CanvasRenderingContext2D
  ): void {
    if (label) {
      this.setLabelFontStyle(overlayContext);
      const bottomPadding = 10;
      const sidePadding = 10;
      overlayContext.strokeText(
        label,
        sidePadding,
        (overlayContext.canvas.height - bottomPadding * this.devicePixelRatio) /
          this.devicePixelRatio
      );
      overlayContext.fillText(
        label,
        sidePadding,
        (overlayContext.canvas.height - bottomPadding * this.devicePixelRatio) /
          this.devicePixelRatio
      );
    }
  }
  drawBottomRightOverlayLabel(
    label: string | false,
    overlayContext: CanvasRenderingContext2D
  ): void {
    if (label) {
      this.setLabelFontStyle(overlayContext);
      const bottomPadding = 10;
      const sidePadding = 10;
      const labelWidth =
        overlayContext.measureText(label).width * this.devicePixelRatio;
      overlayContext.strokeText(
        label,
        (overlayContext.canvas.width -
          (labelWidth + sidePadding * this.devicePixelRatio)) /
          this.devicePixelRatio,
        (overlayContext.canvas.height - bottomPadding * this.devicePixelRatio) /
          this.devicePixelRatio
      );
      overlayContext.fillText(
        label,
        (overlayContext.canvas.width -
          (labelWidth + sidePadding * this.devicePixelRatio)) /
          this.devicePixelRatio,
        (overlayContext.canvas.height - bottomPadding * this.devicePixelRatio) /
          this.devicePixelRatio
      );
    }
  }
  incrementSpeed(): void {
    this.speedMultiplierIndex++;
    if (this.speedMultiplierIndex === PlaybackSpeeds.length) {
      this.speedMultiplierIndex = 0;
    }
    this.setPlayerMessage(
      `Speed ${PlaybackSpeeds[this.speedMultiplierIndex]}x`
    );
    window.localStorage.setItem(
      "video-playback-speed",
      PlaybackSpeeds[this.speedMultiplierIndex].toString()
    );
  }
  async incrementPalette(): Promise<void> {
    this.paletteIndex++;
    if (this.paletteIndex === ColourMaps.length) {
      this.paletteIndex = 0;
    }
    const paletteName = ColourMaps[this.paletteIndex][0];
    this.setPlayerMessage(paletteName);
    window.localStorage.setItem("video-palette", paletteName);
    this.colourMap = ColourMaps[this.paletteIndex];
    await this.renderCurrentFrame();
  }
  showHeaderInfo(): void {
    this.displayHeaderInfo = true;
  }
  setPlayerMessage(message: string): void {
    if (this.messageTimeout !== null || this.playerMessage !== null) {
      clearTimeout(this.messageTimeout as number);
      this.messageTimeout = null;
      this.playerMessage = null;
      cancelAnimationFrame(this.messageAnimationFrame as number);
      this.messageAnimationFrame = requestAnimationFrame(() => {
        this.setPlayerMessage(message);
      });
    } else {
      this.playerMessage = message;
      this.messageTimeout = setTimeout(() => {
        this.messageTimeout = null;
        this.playerMessage = null;
      }, 1000);
    }
  }
  renderOverlay(
    context: CanvasRenderingContext2D | null,
    scale: number,
    timeSinceFFCSeconds: number | null,
    isExporting: boolean,
    frameNum: number,
    trackExportOptions?: TrackExportOption[]
  ): void {
    if (context) {
      if (!isExporting) {
        // Clear if we are drawing on the live overlay, but not if we're drawing for export
        context.clearRect(
          0,
          0,
          context.canvas.width * (1 / this.devicePixelRatio),
          context.canvas.height * (1 / this.devicePixelRatio)
        );
      }
      const tracks =
        this.processedTracks[frameNum] || ({} as Record<number, TrackBox>);
      const frameTracks = Object.entries(tracks);
      if (
        this.currentTrack &&
        !isExporting &&
        this.canSelectTracks &&
        frameTracks.length === 1
      ) {
        const trackId = Number(frameTracks[0][0]);
        // If the track is the only track at this time offset, make it the selected track.
        if (this.currentTrack.id !== trackId) {
          this.$emit("track-selected", { trackId });
        }
      }

      if (
        this.currentTrack &&
        (!this.showOverlaysForCurrentTrackOnly || isExporting)
      ) {
        for (const [trackId, trackBox] of frameTracks) {
          if (this.currentTrack.id !== Number(trackId)) {
            if (
              !trackExportOptions ||
              trackExportOptions[Number(trackId)].displayInExport
            ) {
              const box = trackBox as TrackBox;
              this.drawRectWithText(
                context,
                Number(trackId),
                box.rect,
                box.what,
                isExporting
              );
            }
          }
        }
      }
      // Always draw selected track last, so it sits on top of any overlapping tracks.
      for (const [trackId, trackBox] of frameTracks) {
        if (this.currentTrack && this.currentTrack.id === Number(trackId)) {
          if (
            !trackExportOptions ||
            trackExportOptions[Number(trackId)].displayInExport
          ) {
            const box = trackBox as TrackBox;
            this.drawRectWithText(
              context,
              Number(trackId),
              box.rect,
              box.what,
              isExporting
            );
          }
        }
      }
      if (timeSinceFFCSeconds !== null && timeSinceFFCSeconds < 10) {
        context.font = "bold 15px Verdana";

        // NOTE: Make opacity of text stronger when the FFC event has just happened, then fade out
        let a = 1 / (10 - timeSinceFFCSeconds);
        a = a * a;
        const alpha = 1 - a;
        context.fillStyle = `rgba(163, 210, 226, ${alpha})`;

        const text = "Calibrating...";
        const textWidth = context.measureText(text).width;
        const deviceRatio = isExporting ? 1 : window.devicePixelRatio;
        const textX = context.canvas.width / deviceRatio / 2 - textWidth / 2;
        const textY = 20;
        context.fillText(text, textX, textY);
      }
    }
  }
  drawRectWithText(
    context: CanvasRenderingContext2D,
    trackId: number,
    dims: Rectangle,
    what: string | null,
    isExporting: boolean
  ): void {
    if (!this.header) {
      return;
    }
    const selected =
      (this.currentTrack && this.currentTrack.id === trackId) || isExporting;
    const trackIndex = this.tracks.findIndex((track) => track.id === trackId);
    const lineWidth = selected ? 2 : 1;
    const outlineWidth = lineWidth + 4;
    const halfOutlineWidth = outlineWidth / 2;
    const deviceRatio = isExporting ? 1 : window.devicePixelRatio;
    const scale = context.canvas.width / this.header.width;
    const [left, top, right, bottom] = dims.map((x) => x * scale);
    const rectWidth = right - left;
    const rectHeight = bottom - top;

    const x =
      Math.max(halfOutlineWidth, Math.round(left) - halfOutlineWidth) /
      deviceRatio;
    const y =
      Math.max(halfOutlineWidth, Math.round(top) - halfOutlineWidth) /
      deviceRatio;
    const width =
      Math.round(Math.min(context.canvas.width - left, Math.round(rectWidth))) /
      deviceRatio;
    const height =
      Math.round(
        Math.min(context.canvas.height - top, Math.round(rectHeight))
      ) / deviceRatio;
    context.lineJoin = "round";
    context.lineWidth = outlineWidth;
    context.strokeStyle = `rgba(0, 0, 0, ${selected ? 0.4 : 0.5})`;
    context.beginPath();
    context.strokeRect(x, y, width, height);
    context.strokeStyle = this.colours[trackIndex % this.colours.length];
    context.lineWidth = lineWidth;
    context.beginPath();
    context.strokeRect(x, y, width, height);
    if (selected || isExporting) {
      // If exporting, show all the best guess animal tags, if not unknown
      if (what !== null) {
        const text = what;
        const textHeight = 9 * deviceRatio;
        const textWidth = context.measureText(text).width * deviceRatio;
        const marginX = 2 * deviceRatio;
        const marginTop = 2 * deviceRatio;
        let textX =
          Math.min(context.canvas.width, right) - (textWidth + marginX);
        let textY = bottom + textHeight + marginTop;
        // Make sure the text doesn't get clipped off if the box is near the frame edges
        if (textY + textHeight > context.canvas.height) {
          textY = top - textHeight;
        }
        if (textX < 0) {
          textX = left + marginX;
        }
        context.font = "13px sans-serif";
        context.lineWidth = 4;
        context.strokeStyle = "rgba(0, 0, 0, 0.5)";
        context.strokeText(text, textX / deviceRatio, textY / deviceRatio);
        context.fillStyle = "white";
        context.fillText(text, textX / deviceRatio, textY / deviceRatio);
      }
    }
  }
  toggleSmoothing(): void {
    this.smoothed = !this.smoothed;
    window.localStorage.setItem("video-smoothing", String(this.smoothed));
    this.setPlayerMessage(
      `Smoothing ${this.smoothed ? "Enabled" : "Disabled"}`
    );
  }
  togglePicker(): void {
    // When we move the cursor over the image, should show raw and estimated temp values of pixel under cursor.
    this.showValueInfo = !this.showValueInfo;
  }
  async toggleBackground(): Promise<void> {
    this.wasPaused = !this.playing;
    if (!this.isShowingBackgroundFrame) {
      const background = this.getFrameAtIndex(-1);
      if (background && this.header) {
        this.animationTick = 0;
        if (this.playing) {
          this.pause();
          this.wasPaused = true;
        }
        const context = this.canvas.getContext("2d");
        if (!context) {
          return;
        }
        const [min, max] = this.minMaxForFrame(background);
        renderFrameIntoFrameBuffer(
          frameBuffer,
          background.data,
          this.colourMap[1],
          min,
          max
        );
        context.putImageData(
          new ImageData(frameBuffer, this.header.width, this.header.height),
          0,
          0
        );
        // Clear overlay
        const overlayContext = this.overlayCanvas.getContext("2d");
        if (overlayContext) {
          overlayContext.clearRect(
            0,
            0,
            overlayContext.canvas.width * (1 / this.devicePixelRatio),
            overlayContext.canvas.height * (1 / this.devicePixelRatio)
          );

          this.drawBottomLeftOverlayLabel("Background frame", overlayContext);
        }
      }
    } else {
      if (!this.wasPaused) {
        this.wasPaused = false;
        await this.play();
      } else {
        await this.renderCurrentFrame(true);
      }
    }
    this.isShowingBackgroundFrame = !this.isShowingBackgroundFrame;
  }
  getTrackIdAtPosition(x: number, y: number): number | null {
    const tracks =
      this.processedTracks[this.frameNum] || ({} as Record<number, TrackBox>);
    for (const [trackId, trackBox] of Object.entries(tracks)) {
      const box = trackBox as TrackBox;
      const [left, top, right, bottom] = box.rect.map((x) => x * this.scale);
      if (left <= x && right > x && top <= y && bottom > y) {
        // If the track is already selected, ignore it
        if (this.currentTrack && Number(trackId) === this.currentTrack.id) {
          continue;
        }
        return Number(trackId);
      }
    }
    return null;
  }
  onResize(): void {
    // Only trigger if width has changed, since scrolling on mobile will hide the browser chrome at top
    // and trigger a resize
    if (window.innerWidth !== this.windowWidth) {
      this.windowWidth = window.innerWidth;
      this.animationTick = 0;
      this.setCanvasDimensions();
    }
  }
  setCanvasDimensions(): void {
    const canvasDimensions = this.canvas.getBoundingClientRect();
    this.canvasWidth = canvasDimensions.width;
    this.scale = this.canvasWidth / 160;
    if (this.header) {
      this.scale = this.canvasWidth / this.header.width;
    }
    this.canvasHeight = canvasDimensions.width * 0.75;
    this.devicePixelRatio = window.devicePixelRatio;
    const canvas = this.overlayCanvas;
    canvas.width = this.canvasWidth * this.devicePixelRatio;
    canvas.height = this.canvasHeight * this.devicePixelRatio;
    canvas.style.width = `${this.canvasWidth}px`;
    canvas.style.height = `${this.canvasHeight}px`;
    const context = canvas.getContext("2d");
    this.container.style.maxHeight = `${this.canvasHeight}px`;
    if (context) {
      context.scale(this.devicePixelRatio, this.devicePixelRatio);
    }
    if (this.header) {
      this.renderCurrentFrame();
    }
  }
  getFrameAtTime(time: number): number {
    if (this.header) {
      return getFrameIndexAtTime(
        time,
        this.actualDuration,
        this.header.fps,
        this.loadedFrames,
        this.header.hasBackgroundFrame
      );
    }
    return 0;
  }
  async setTimeAndRedraw(time = -1, frameNum = -1): Promise<void> {
    // If the user is already seeking, don't queue up new seek events until that download progress completes.
    if (!this.seekingInProgress) {
      this.isShowingBackgroundFrame = false;
      if (this.header) {
        let totalFrames =
          this.totalFrames &&
          this.totalFrames - (this.header.hasBackgroundFrame ? 1 : 0);
        if (totalFrames === null) {
          totalFrames = Math.floor(
            this.actualDuration * (this.header.fps as number)
          );
        }
        //console.log(`setTimeAndRedraw ${time}, ${frameNum}/${totalFrames}`);
        this.animationTick = 0;
        if (time !== -1 && this.actualDuration !== 0) {
          this.frameNum = Math.floor(
            Math.min(
              totalFrames as number,
              (time / this.actualDuration) * (totalFrames as number)
            )
          );
        } else if (frameNum !== -1) {
          this.frameNum = frameNum;
        }
        this.atEndOfPlayback = this.frameNum === totalFrames - 1;
        //console.log("At end?", this.frameNum, totalFrames - 1);
        await this.renderCurrentFrame(true);
      }
    }
  }
  async renderCurrentFrame(force = false, frameNum?: number): Promise<boolean> {
    if (this.header) {
      this.loadProgress = await cptvDecoder.getLoadProgress();
      if (frameNum === undefined) {
        frameNum = this.frameNum;
      }
      if (frameNum > this.loadedFrames + 2 && !this.totalFrames) {
        this.buffering = true;
      }
      // console.log(
      //   "Render frame num",
      //   `# ${frameNum}`,
      //   `Loaded ${this.internalLoadedFrames}`,
      //   `Total ${this.internalTotalFrames}`
      // );
      while (this.loadedFrames <= frameNum && !this.totalFrames) {
        this.seekingInProgress = true;
        const frame = await cptvDecoder.getNextFrame();
        console.assert(frame !== null);
        if (frame === null) {
          // Poll again so that we can read out totalFrames
          await cptvDecoder.getNextFrame();
        }
        this.totalFrames = await cptvDecoder.getTotalFrames();
        this.totalFrames =
          this.totalFrames &&
          this.totalFrames + (this.header.hasBackgroundFrame ? 1 : 0);
        if (frame === null) {
          if (await cptvDecoder.hasStreamError()) {
            this.streamLoadError = await cptvDecoder.getStreamError();
            await cptvDecoder.free();
            this.totalFrames = frames.length;
          }
          break;
        }
        if (!this.totalFrames) {
          // If we got the total frames, then we're at the end of the stream, and the last
          // frame has already been pulled out.
          frames.push(frame);
        }
        this.loadedFrames = frames.length;
      }
      this.seekingInProgress = false;
      this.buffering = false;
      const gotFrame = frameNum < this.loadedFrames;
      const frameData = this.getFrameAtIndex(frameNum);
      this.frameHeader = frameData.meta;
      //console.log("Got frame ", frameNum, gotFrame, frames.length);
      this.renderFrame(frameData, frameNum, force);
      return gotFrame;
    }
    return false;
  }
  startScrub(): void {
    this.wasPaused = !this.playing;
    if (!this.wasPaused) {
      this.pause();
    }
    this.isScrubbing = true;
  }
  endScrub(): void {
    if (!this.wasPaused) {
      this.play();
    }
    this.isScrubbing = false;
  }
  async play(): Promise<void> {
    this.playing = true;
    this.isShowingBackgroundFrame = false;
    await this.fetchRenderAdvanceFrame();
  }
  async togglePlayback(): Promise<void> {
    if (!this.playing) {
      if (this.atEndOfPlayback) {
        this.frameNum = 0;
        this.animationTick = 0;
        this.atEndOfPlayback = false;
      }
      await this.play();
    } else {
      this.pause();
    }
  }
  requestPrevRecording(): void {
    if (this.canGoBackwards) {
      this.frameNum = 0;
      this.buffering = true;
      this.atEndOfPlayback = false;
      this.$emit("request-prev-recording");
    } else {
      this.showAtEndOfSearch = true;
    }
  }
  requestNextRecording(): void {
    if (this.canGoForwards) {
      this.frameNum = 0;
      this.atEndOfPlayback = false;
      this.buffering = true;
      this.$emit("request-next-recording");
    } else {
      this.showAtEndOfSearch = true;
    }
  }
  pause(): void {
    this.playing = false;
    cancelAnimationFrame(this.animationFrame as number);
  }
}
</script>

<style lang="scss">
@import "./bootstrap-imports.scss";
* {
  box-sizing: border-box;
}
.cptv-player {
  max-width: 100vh;
  .video-container {
    margin: 0 auto;
    position: relative;
    width: 100%;
    max-width: 100vw;
    padding: 0;
    background: black;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    overflow: hidden;
    .track-scrubber {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
  .video-canvas {
    width: 100%;
    height: 100%;
    max-width: 100vh;

    image-rendering: pixelated;
    image-rendering: crisp-edges;
    &.smoothed {
      image-rendering: auto;
    }
  }
  .overlay-canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
  .time,
  .temp,
  .value-tooltip {
    position: absolute;
    right: 7px;
    bottom: 7px;
    font-size: 12px;
    line-height: 12px;
    color: white;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    padding: 3px;
    user-select: none;
    pointer-events: none;
  }
  .temp {
    //top: 7px;
    left: 7px;
    right: unset;
    //bottom: unset;
  }
  .value-tooltip {
    bottom: unset;
    right: unset;
  }

  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;

      transform: scale(1.2);
    }
    100% {
      opacity: 0;
    }
  }

  @-moz-keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @-webkit-keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .player-messaging {
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    display: block;
    bottom: 50px;
    color: white;
    font-size: 20px;
    opacity: 0;
    transform-origin: center;
    &.show {
      animation: fadeInOut 1s;
      -webkit-animation: fadeInOut 1s;
      -moz-animation: fadeInOut 1s;
      -o-animation: fadeInOut 1s;
    }
  }

  .playback-controls {
    color: white;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    pointer-events: none;
    background: transparent;
    &:not(.mini) {
      background: radial-gradient(
        circle,
        rgba(0, 0, 0, 0.9) 0%,
        rgba(0, 0, 0, 0.5) 50%,
        rgba(0, 0, 0, 0.2) 80%,
        rgba(0, 0, 0, 0) 100%
      );
    }
    opacity: 0;
    transition: opacity 0.3s;
    &.show {
      opacity: 1;
      pointer-events: unset;
      &.mini {
        bottom: 0;
        height: 20%;
        top: unset;
        right: 0;
        left: 0;
      }
    }
    > button {
      touch-action: manipulation;
      min-width: 44px;
      min-height: 44px;
      &.hide {
        opacity: 0;
      }
      > svg {
        transition: opacity 0.3s;
        opacity: 0.5;
      }
      &:hover:not(:disabled),
      &:hover:not(.disabled),
      &:active:not(:disabled),
      &:active:not(.disabled) {
        > svg {
          opacity: 0.8;
        }
      }
      &:disabled,
      &.disabled {
        > svg {
          opacity: 0.1;
        }
      }
      background: transparent;
      &:focus,
      &:active {
        outline: none;
      }
      color: inherit;
      border: 0;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
    }
  }

  .replay,
  .buffering {
    min-width: 44px;
    min-height: 44px;
  }

  .playback-nav,
  .debug-tools {
    min-height: 44px;
    background: #2b333f;
    color: white;
    display: flex;
    position: relative;
    justify-content: space-between;
    //border-top: 1px solid rgb(77, 86, 97);
    button {
      touch-action: manipulation;
      user-select: none;
      min-width: 48px;
      padding: 0;
      min-height: 44px;
      background: transparent;
      &:focus,
      &:active {
        outline: none;
      }
      &:active:not(:disabled),
      &.selected:not(:disabled) {
        color: yellowgreen;
      }
      &:disabled {
        color: rgba(255, 255, 255, 0.1);
      }
      color: inherit;
      border: 0;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
    }

    .advanced-controls {
      width: 48px;
      height: 44px;
      overflow: hidden;
      user-select: none;
      transition: width 0.3s ease-in-out;
      display: flex;
      &.open {
        width: 240px;
        .advanced-controls-btn {
          position: relative;
          &::before {
            position: absolute;
            top: 11px;
            left: 12px;
            content: "";
            background: rgba(255, 255, 255, 0.1);
            border-radius: 11px;
            width: 22px;
            height: 22px;
          }
        }
      }
    }
  }
  .debug-tools {
    background: darken(#2b333f, 2%);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    min-height: 0;
    height: 0;
    overflow: hidden;
    transition: height 0.2s ease-in-out;
    &.open {
      height: 44px;
    }
    justify-content: space-between;
    .debug-info {
      user-select: none;
      padding: 0 5px;
      line-height: 22px;
      font-size: 11px;
    }
  }
  .right-nav {
    display: flex;
  }
  .tracks-container {
    position: relative;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    overflow: hidden;
    margin-bottom: 5px;
  }
  .playhead {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
  }
  .playback-speed {
    font-weight: bold;
    font-size: 90%;
    user-select: none;
  }
  .cptv-drop-area {
    width: 50%;
    height: 50%;
    min-width: 300px;
    min-height: 225px;
    border: 2px dashed silver;
    border-radius: 5px;
    > .custom-file-input,
    > .custom-file-label {
      bottom: 0;
    }
    > .custom-file-label {
      padding: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      transition: background-color 300ms linear;
      color: white;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-color: transparent;
      &.dragging {
        background-color: #2b333f;
      }
      &::after {
        position: unset;
        border-radius: 3px;
      }
    }
  }
}
.tooltip {
  z-index: 100000;
}
.progress-bar {
  transition: width 0.1s linear;
}
.progress-text {
  text-align: center;
  user-select: none;
}
.cancel-export-button {
  margin-top: 20px;
  text-align: center;
}
</style>
