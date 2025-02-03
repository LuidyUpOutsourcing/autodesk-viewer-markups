export const selectMarkupByIndex = (markupIndex) => {
  const layer = window.Markup.svgLayersMap[LAYER_ID];
  const markup = layer.markups[markupIndex];
  window.Markup.selectMarkup(markup);
};
