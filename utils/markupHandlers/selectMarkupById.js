export const selectMarkupById = markupId => {
  const markup = window.Markup.getMarkup(markupId);
  window.Markup.selectMarkup(markup);
};