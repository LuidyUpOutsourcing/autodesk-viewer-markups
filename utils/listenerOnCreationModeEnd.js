export const listenerOnCreationModeEnd = () => {
  window.Markup.addEventListener('EVENT_EDITMODE_CREATION_END', function (e) {
    const element = e;
    console.log('element: ', element);
  });
};