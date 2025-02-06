export const addOnMarkupSelectedListener = (markupsCore) => {
  markupsCore.addEventListener(Autodesk.Extensions.Markup.Core.EVENT_MARKUP_SELECTED, function (e) {
    var selectedMarkup = e.markup;
    console.log('selectedMarkup: ', selectedMarkup);
  });
};
