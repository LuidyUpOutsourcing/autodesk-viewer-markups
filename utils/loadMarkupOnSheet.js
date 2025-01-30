export const loadMarkupOnSheet = async (markupSvg, layerId) => {
  window.Markup.show(); // Enables loading of previously saved markups.
  window.Markup.loadMarkups(markupSvg, layerId);
};
