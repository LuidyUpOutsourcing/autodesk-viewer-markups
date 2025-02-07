import { SVG_00, LAYER_ID } from "./constants.js";

// Cutomizations:
import changeSelectMarkup from "./utils/customizers/changeSelectMarkup.js";
import addMarkupTypeSelector from "./utils/customizers/addMarkupTypeSelector.js";
import addEditModeSelector from "./utils/customizers/addEditModeSelector.js";
import addEnterSelectionMode from "./utils/customizers/addEnterSelectionMode.js";

// Initializers:
import { initializeViewing } from "./utils/initializers/initializeViewing.js";
import { initializeAutodeskPDF } from "./utils/initializers/initializeAutodeskPDF.js";
import { initializeMarkupCore } from "./utils/initializers/initializeMarkupCore.js";
import { initializeMarkupsGui } from "./utils/initializers/initializeMarkupsGui.js";

// Listeners:
import { addOnMarkupSelectedListener } from "./utils/listeners/addOnMarkupSelectedListener.js";
import { addOnEditModeLeaveListener } from "./utils/listeners/addOnEditModeLeaveListener.js";
import { addOnCreationModeEndListener } from "./utils/listeners/addOnCreationModeEndListener.js";

import { loadMarkupOnSheet } from "./utils/loadMarkupOnSheet.js";
import { enableMarkupsSelection } from "./utils/enableMarkupsSelection.js";


const setupAutodesk = async () => {
  try {
    const guiViewer3D = await initializeViewing();
    await initializeAutodeskPDF('./assets/sample.pdf', guiViewer3D);
    const markupsCore = await initializeMarkupCore(guiViewer3D);
    window.markupsCore = markupsCore;
    await initializeMarkupsGui(guiViewer3D);

    // Cutomizations:
    addMarkupTypeSelector();
    addEditModeSelector();
    changeSelectMarkup();
    addEnterSelectionMode();

    await loadMarkupOnSheet({ markupSvg: SVG_00, layerId: LAYER_ID, markupsCore });
    await enableMarkupsSelection(LAYER_ID, markupsCore);

    // Add Event Listeners
    addOnMarkupSelectedListener(markupsCore);
    addOnEditModeLeaveListener(markupsCore);
    addOnCreationModeEndListener(markupsCore);
  } catch (error) {
    console.log('Error: ', error.message)
  }
}

setupAutodesk();

