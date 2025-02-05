export const loadMarkupOnSheet = async ({markupSvg, layerId, markupsCore }) => {
  markupsCore.show(); // Enables loading of previously saved markups.
  markupsCore.loadMarkups(markupSvg, layerId);
};
