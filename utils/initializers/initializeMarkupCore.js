export const initializeMarkupCore = async (guiViewer3D = {}) => {
  try {
    const markupsCore = await guiViewer3D.loadExtension(
      "Autodesk.Viewing.MarkupsCore"
    );

    return markupsCore;
  } catch (error) {
    const failureMessage = 'Error on initializeMarkupCore' + error.message
    throw new Error(failureMessage);
  }
};
