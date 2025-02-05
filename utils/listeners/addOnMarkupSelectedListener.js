export const addOnMarkupSelectedListener = (markupsCore) => {
  markupsCore.addEventListener('EVENT_MARKUP_SELECTED', function (e) {
    var selectedMarkup = e.markup;
    console.log('selectedMarkup: ', selectedMarkup);
  });
};
