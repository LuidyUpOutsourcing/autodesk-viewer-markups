export const initializeAutodeskPDF = async (pdfUrl = '', guiViewer3D = {}) => {
  try {
    await guiViewer3D.loadExtension('Autodesk.PDF')
    await guiViewer3D.loadModel(pdfUrl);
    await guiViewer3D.waitForLoadDone(); // Wait for models to be completely loaded
  }  catch (error) {
    const failureMessage = 'Error on initializeAutodeskPDF: ' + error.message
    throw new Error(failureMessage);
  }
};