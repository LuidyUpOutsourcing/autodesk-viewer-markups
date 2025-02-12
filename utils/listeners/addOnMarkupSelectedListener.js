export const addOnMarkupSelectedListener = (markupsCore) => {
  markupsCore.addEventListener(Autodesk.Extensions.Markup.Core.EVENT_MARKUP_SELECTED, ({ markup }) => {
    var layers = Object.keys(markupsCore.svgLayersMap);
    var selectedMarkup = { type: '', id: null };

    outerLoop: for (const layerId of layers) {
      const layer = markupsCore.svgLayersMap[layerId];
      const layerMarkups = layer.markups;
      for (const i of layerMarkups) {
        if (i === markup) {
          const [type, id] = layerId.split('-');
          selectedMarkup.type = type;
          selectedMarkup.id = id
          break outerLoop;
        }
      }
    }

    console.log('\n\n selectedMarkup: ', selectedMarkup, '\n\n');
  });
};
