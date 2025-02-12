import { SVG_ARROW, SVG_RETANGLE, SVG_POLYLINE, SVG_FREEEHAND, SVG_ELLIPSE } from "./constants.js";

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

const setupAutodesk = async () => {
  try {
    const guiViewer3D = await initializeViewing();
    await initializeAutodeskPDF('./assets/sample.pdf', guiViewer3D);
    window.markupsCore = await initializeMarkupCore(guiViewer3D);
    await initializeMarkupsGui(guiViewer3D);

    // Cutomizations:
    addMarkupTypeSelector();
    addEditModeSelector();
    changeSelectMarkup();
    addEnterSelectionMode();

    loadMarkupOnSheet({ markupSvg: SVG_ARROW, layerId: 'arrow-005' });
    loadMarkupOnSheet({ markupSvg: SVG_RETANGLE, layerId: 'retangle-100' });
    loadMarkupOnSheet({ markupSvg: SVG_POLYLINE, layerId: 'polyline-102' });
    loadMarkupOnSheet({ markupSvg: SVG_FREEEHAND, layerId: 'freehand-104' });
    loadMarkupOnSheet({ markupSvg: SVG_ELLIPSE, layerId: 'ellipse-103' });

    window.markupsCore.enterSelectionMode();
    // window.markupsCore.enterEditMode();

    // Add Event Listeners
    addOnMarkupSelectedListener(window.markupsCore);
    addOnEditModeLeaveListener(window.markupsCore);
    addOnCreationModeEndListener(window.markupsCore);
  } catch (error) {
    console.log('Error: ', error.message)
  }
}

setupAutodesk();

