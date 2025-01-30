// Load the Markups Grafic Interface
export const initializeMarkupsGui = async () => {
  await window.GuiViewer3D.loadExtension('Autodesk.Viewing.MarkupsGui');
};
