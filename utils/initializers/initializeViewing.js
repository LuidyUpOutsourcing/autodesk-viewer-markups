export const initializeViewing = async () => {
  try {
    if (Autodesk.Viewing.Private.analytics) {
      Autodesk.Viewing.Private.analytics.optOut();
    }

    await Autodesk.Viewing.Initializer({ env: "Local", useADP: false });
    
    const container = document.getElementById('forgeViewer');
    const guiViewer3D = new Autodesk.Viewing.Private.GuiViewer3D(container);

    const startedCode = guiViewer3D.start();
    if (startedCode > 0) {
      throw new Error("Failed on creating Viewer. Please try load project again.");
    }

    return guiViewer3D;
  } catch (error) {
    const failureMessage = "Error on initializeViewer: " + error.message;
    throw new Error(failureMessage);
  }
};
