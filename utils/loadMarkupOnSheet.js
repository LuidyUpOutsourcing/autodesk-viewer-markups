export const loadMarkupOnSheet = ({ markupSvg, layerId }) => {
  window.markupsCore.show(); // Enables loading of previously saved markups.
  window.markupsCore.loadMarkups(markupSvg, layerId);
};
