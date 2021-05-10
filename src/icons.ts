import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

// NOTE explicitly import only the icons we need, otherwise they don't seem to be shaken out
//  of the compiled bundle by webpack properly.
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { faBackward } from "@fortawesome/free-solid-svg-icons/faBackward";
import { faForward } from "@fortawesome/free-solid-svg-icons/faForward";
import { faEyeDropper } from "@fortawesome/free-solid-svg-icons/faEyeDropper";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { faPause } from "@fortawesome/free-solid-svg-icons/faPause";
import { faPalette } from "@fortawesome/free-solid-svg-icons/faPalette";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons/faRedoAlt";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons/faFolderOpen";
import { faImage } from "@fortawesome/free-solid-svg-icons/faImage";
import { faFileVideo } from "@fortawesome/free-solid-svg-icons/faFileVideo";
import { faWrench } from "@fortawesome/free-solid-svg-icons/faWrench";
import { faChartBar } from "@fortawesome/free-solid-svg-icons/faChartBar";
import { faStepForward } from "@fortawesome/free-solid-svg-icons/faStepForward";
import { faStepBackward } from "@fortawesome/free-solid-svg-icons/faStepBackward";
// https://www.npmjs.com/package/@fortawesome/vue-fontawesome
library.add(
  faAngleRight,
  faBackward,
  faEyeDropper,
  faForward,
  faInfoCircle,
  faPlay,
  faPalette,
  faPause,
  faRedoAlt,
  faSpinner,
  faFolderOpen,
  faImage,
  faFileVideo,
  faWrench,
  faChartBar,
  faStepForward,
  faStepBackward
);

export default FontAwesomeIcon;
