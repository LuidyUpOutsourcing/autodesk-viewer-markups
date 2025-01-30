export const listenerOnEditModeLeave = () => {
  window.Markup.addEventListener('EVENT_EDITMODE_LEAVE', function (e) {
    const element = e;
    console.log('element: ', element);
  });
};