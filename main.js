import { SVG_00, LAYER_ID } from "./constants.js";
import { initializeViewer } from "./utils/initializeViewer.js";
import { initializeMarkupCore } from "./utils/initializeMarkupCore.js";
import { loadMarkupOnSheet } from "./utils/loadMarkupOnSheet.js";
import { listenerOnMarkupSelected } from "./utils/listenerOnMarkupSelected.js";
import { listenerOnEditModeLeave } from "./utils/listenerOnEditModeLeave.js";
import { listenerOnCreationModeEnd } from "./utils/listenerOnCreationModeEnd.js";
import { enableMarkupsSelection } from "./utils/enableMarkupsSelection.js";
import { overwriteSelectMarkup } from "./utils/markup-core-overwites/overwriteSelectMarkup.js";

initializeViewer("https://pdfobject.com/pdf/sample.pdf").then(async () => {
  await initializeMarkupCore();
  await loadMarkupOnSheet(SVG_00, LAYER_ID);
  overwriteSelectMarkup(window.Markup);
  await enableMarkupsSelection(LAYER_ID);

  // Listeners
  listenerOnMarkupSelected();
  listenerOnEditModeLeave();
  listenerOnCreationModeEnd();
});
