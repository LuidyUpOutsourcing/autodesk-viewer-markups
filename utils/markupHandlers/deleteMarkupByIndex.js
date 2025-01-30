export const deleteMarkupByIndex = markupIndex => {
  const layer = window.Markup.svgLayersMap[LAYER_ID];
  const markup = layer.markups[markupIndex];
  window.Markup.selectMarkup(markup);
  window.Markup.deleteMarkup(markup); //Deletes a markup from the canvas. Only applies while in Edit mode.
};
