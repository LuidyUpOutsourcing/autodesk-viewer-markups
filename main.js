import { SVG_00, SVG_01, SVG_02, LAYER_ID } from "./constants.js";
import { initializeViewer } from "./utils/initializeViewer.js";
import { initializeMarkupCore } from "./utils/initializeMarkupCore.js";
import { initializeMarkupsGui } from "./utils/initializeMarkupsGui.js";
import { loadMarkupOnSheet } from "./utils/loadMarkupOnSheet.js";
// import { loadManyMarkupsOnSheet } from "./utils/loadManyMarkupsOnSheet.js";
import { listenerOnMarkupSelected } from "./utils/listenerOnMarkupSelected.js";
import { listenerOnEditModeLeave } from "./utils/listenerOnEditModeLeave.js";
import { listenerOnCreationModeEnd } from "./utils/listenerOnCreationModeEnd.js";

initializeViewer("https://pdfobject.com/pdf/sample.pdf").then(async () => {
  await initializeMarkupCore();
  await initializeMarkupsGui();
  await loadMarkupOnSheet(SVG_00, LAYER_ID);
  // await loadManyMarkupsOnSheet([SVG_01, SVG_02], LAYER_ID);

  // enableMarkupsSelection has dependencies on MarkupCore initialization and should only be imported after that.
  const { enableMarkupsSelection } = await import(
    "./utils/enableMarkupsSelection.js"
  );
  enableMarkupsSelection(LAYER_ID);

  // Listeners
  listenerOnMarkupSelected();
  listenerOnEditModeLeave();
  listenerOnCreationModeEnd();
});
