export const loadManyMarkupsOnSheet = async (
  markpsSvg = [],
  layerPrefixId = 'layer-0'
) => {
  window.Markup.show(); // Enables loading of previously saved markups.
  markpsSvg.forEach((item, index) => {
    window.Markup.loadMarkups(item, layerPrefixId + index);
  });
};
