import { SVG_00, SVG_01, SVG_02, LAYER_ID } from "./constants";
import { initializeViewer } from "./utils/initializeViewer";
import { initializeMarkupCore } from "./utils/initializeMarkupCore";
import { initializeMarkupsGui } from "./utils/initializeMarkupsGui";
import { loadMarkupOnSheet } from "./utils/loadMarkupOnSheet";
import { loadManyMarkupsOnSheet } from "./utils/loadManyMarkupsOnSheet";
import { listenerOnMarkupSelected } from "./utils/listenerOnMarkupSelected";
import { listenerOnEditModeLeave } from "./utils/listenerOnEditModeLeave";
import { listenerOnCreationModeEnd } from "./utils/listenerOnCreationModeEnd";
import { enableMarkupsSelection } from "./utils/enableMarkupsSelection";

initializeViewer("https://pdfobject.com/pdf/sample.pdf").then(async () => {
  await initializeMarkupCore();
  await initializeMarkupsGui();
  await loadMarkupOnSheet(SVG_00, LAYER_ID);
  // await loadManyMarkupsOnSheet([SVG_01, SVG_02], LAYER_ID);
  enableMarkupsSelection(LAYER_ID);

  // Listeners
  listenerOnMarkupSelected();
  listenerOnEditModeLeave();
  listenerOnCreationModeEnd();
});
