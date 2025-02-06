markupsCore.addEventListener('EVENT_MARKUP_DESELECT', function (e) {
  // sometimes this event is fired, even when selectedMarkup is null
  if (selectedMarkup === null) return;
  selectedMarkup = null;

  if (e.target.type === 'freehand') return;
  
  if (e.markupId === e.target.editor.nextId && editModeTypes.length === 1) {
    return;
  }

  const previousMarkupType = editModeTypes[editModeTypes.length - 2];
  editModeTypes = previousMarkupType ? [previousMarkupType] : [e.target.type];

  if (previousMarkupType === 'rectangle') {
    const box = new window.Autodesk.Viewing.Extensions.Markups.Core.EditModeRectangle(
      markupsCore,
    );
    markupsCore.changeEditMode(box);
    markupsCore.setStyle(markupInfo.style);
  }

  if (previousMarkupType === 'cloud') {
    const cloud = new window.Autodesk.Viewing.Extensions.Markups.Core.EditModeCloud(
      markupsCore,
    );
    markupsCore.changeEditMode(cloud);
    markupsCore.setStyle(markupInfo.style);
  }

  if (previousMarkupType === 'arrow') {
    const arrow = new window.Autodesk.Viewing.Extensions.Markups.Core.EditModeArrow(
      markupsCore,
    );
    markupsCore.changeEditMode(arrow);
    markupsCore.setStyle(markupInfo.style);
  }
});