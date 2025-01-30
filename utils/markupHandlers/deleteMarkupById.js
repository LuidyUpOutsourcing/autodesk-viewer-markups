export const deleteMarkupById = markupId => {
  const markup = window.Markup.getMarkup(markupId);
  window.Markup.selectMarkup(markup);
  window.Markup.deleteMarkup(markup); //Deletes a markup from the canvas. Only applies while in Edit mode.
};