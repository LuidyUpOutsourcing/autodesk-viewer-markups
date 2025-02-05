export const addOnCreationModeEndListener = (markupsCore) => {
  markupsCore.addEventListener('EVENT_EDITMODE_CREATION_END', function (e) {
    const element = e;
    console.log('element: ', element);
  });
};