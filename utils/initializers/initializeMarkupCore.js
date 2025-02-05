export const initializeMarkupCore = async (guiViewer3D = {}) => {
  try {
    const markupsCore = await guiViewer3D.loadExtension(
      "Autodesk.Viewing.MarkupsCore"
    );

    /*
    * The selectMarkup function is overridden to prevent a selected markup type from being set in edit mode.
    * This handling was implemented to allow selecting markups (via enableMarkupsSelection) without
    * enabling the feature to create a new markup.
    */
    markupsCore.selectMarkup = (markup) => {
      if (markup) {
        markupsCore.editMode.setSelection(markup);
      } else {
        // fix for text markup in view mode
        if (markupsCore.editMode) {
          markupsCore.editMode.setSelection(null);
        }
      }
    };

    return markupsCore;
  } catch (error) {
    const failureMessage = 'Error on initializeMarkupCore' + error.message
    throw new Error(failureMessage);
  }
};
