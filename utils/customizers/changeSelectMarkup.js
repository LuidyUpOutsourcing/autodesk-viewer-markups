export default () => {
  /*
  * The selectMarkup function is overridden to prevent a selected markup type from being set in edit mode.
  * This handling was implemented to allow selecting markups (via enableMarkupsSelection) without
  * enabling the feature to create a new markup.
  */
  window.markupsCore.selectMarkup = (markup) => {
    if (markup) {
      window.markupsCore.editMode.setSelection(markup);
    } else {
      // fix for text markup in view mode
      if (window.markupsCore.editMode) {
        window.markupsCore.editMode.setSelection(null);
      }
    }
  };
}