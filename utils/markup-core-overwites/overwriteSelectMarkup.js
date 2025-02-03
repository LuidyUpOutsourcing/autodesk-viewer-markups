/*
 * The selectMarkup function is overridden to prevent a selected markup type from being set in edit mode.
 * This handling was implemented to allow selecting markups (via enableMarkupsSelection) without
 * enabling the feature to create a new markup.
 */
export const overwriteSelectMarkup = (MarkupsCoreInstance) => {
  MarkupsCoreInstance.selectMarkup = function (markup) {
    if (markup) {
      this.editMode.setSelection(markup);
    } else {
      // fix for text markup in view mode
      if (this.editMode) {
        this.editMode.setSelection(null);
      }
    }
  };
};
