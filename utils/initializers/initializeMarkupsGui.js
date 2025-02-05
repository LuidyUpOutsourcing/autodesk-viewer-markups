// Load the Markups Grafic Interface
export const initializeMarkupsGui = async (GuiViewer3D) => {
  await GuiViewer3D.loadExtension('Autodesk.Viewing.MarkupsGui');
};
