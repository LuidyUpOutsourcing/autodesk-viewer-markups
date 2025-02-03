export const MARKUP_TYPE_SELECTOR = "SELECTOR";
const { EditMode } = Autodesk.Extensions.Markup.Core;

// This class was based on the MarkupArrow function (/extensions/Markup/core/MarkupArrow.js)
export class EditModeSelector extends EditMode {
  constructor(editor) {
    const styleAttributes = ["stroke-width", "stroke-color", "stroke-opacity"];
    super(editor, MARKUP_TYPE_SELECTOR, styleAttributes);
  }
}
