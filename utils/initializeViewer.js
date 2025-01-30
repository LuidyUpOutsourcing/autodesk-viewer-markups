export const initializeViewer = async (pdfURL = '') => {
  await Autodesk.Viewing.Initializer({}, async () => {
    const container = document.getElementById('forgeViewer');
    window.GuiViewer3D = new Autodesk.Viewing.GuiViewer3D(container);
    window.GuiViewer3D.start();
    await window.GuiViewer3D.loadExtension('Autodesk.PDF');
    await window.GuiViewer3D.loadModel(pdfURL);
    await window.GuiViewer3D.waitForLoadDone(); // Wait for models to be completely loaded

    // ---------------------------------------------
    // window.Markup.getSelection(); // Returns the currently selected markup
  });
};
