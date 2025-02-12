export const loadManyMarkupsOnSheet = async (
  markpsSvg = [],
  layerPrefixId = 'layer-0'
) => {
  window.markupsCore.show(); // Enables loading of previously saved markups.
  markpsSvg.forEach((item, index) => {
    window.markupsCore.loadMarkups(item, layerPrefixId + index);
  });
};
