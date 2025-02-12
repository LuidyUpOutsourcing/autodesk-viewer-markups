export default () => {
  // This class was based on the MarkupArrow function (/extensions/Markup/core/MarkupArrow.js)
  Autodesk.Extensions.Markup.Core.EditModeSelector = class EditModeSelector extends Autodesk.Extensions.Markup.Core.EditMode {
    constructor(editor) {
      const styleAttributes = ["stroke-width", "stroke-color", "stroke-opacity"];
      super(
        editor,
        Autodesk.Extensions.Markup.Core.MarkupTypes.MARKUP_TYPE_SELECTOR,
        styleAttributes
      );
    }

    destroy = () => { }
    // unselect = () => {}
    creationBegin = () => { }
    creationEnd = () => { }
    creationCancel = () => { }
    // setStyle = () => {}
    // getStyle = () => {}
    // setSelection = () => {}
    // getSelection = () => {}
    deleteMarkup = () => { }
    isMinSizeValid = () => { }
    startDragging = () => { }
    finishDragging = () => { }
    getFinalMouseDraggingPosition = () => { }
    notifyAllowNavigation = () => { }
    onMouseMove = () => { }
    onMouseDown = () => { }
    onMouseUp = () => { }
    onMouseDoubleClick = () => { }
    onSave = () => { }
    getDraggingPosition = () => { }
    isInsideBounds = () => { }
    useWithSnapping = () => { }
    isTextInputHelperActive = () => { }
  }
}