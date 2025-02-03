"use strict";

export const MARKUP_TYPE_SELECTOR = "SELECTOR";

const { EditMode } = Autodesk.Extensions.Markup.Core;

export function EditModeSelector(editor) {
  var styleAttributes = ["stroke-width", "stroke-color", "stroke-opacity"];
  EditMode.call(this, editor, MARKUP_TYPE_SELECTOR, styleAttributes);
}

EditModeSelector.prototype = Object.create(EditMode.prototype);
EditModeSelector.prototype.constructor = EditModeSelector;

var proto = EditModeSelector.prototype;
proto.deleteMarkup = function () {};
proto.onMouseDown = function () {};
proto.onMouseMove = function () {};
