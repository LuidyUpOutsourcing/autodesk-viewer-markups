export const initializeMarkupCore = async () => {
  window.Markup = await window.GuiViewer3D.loadExtension(
    'Autodesk.Viewing.MarkupsCore'
  );
};
