export const addOnEditModeLeaveListener = (markupsCore) => {
  markupsCore.addEventListener('EVENT_EDITMODE_LEAVE', function (e) {
    const element = e;
    console.log('element: ', element);
  });
};