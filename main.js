const initializeViewer = async (pdfURL = "") => {
  await Autodesk.Viewing.Initializer({}, async () => {
    const container = document.getElementById("forgeViewer");
    window.GuiViewer3D = new Autodesk.Viewing.GuiViewer3D(container);
    window.GuiViewer3D.start();
    await window.GuiViewer3D.loadExtension("Autodesk.PDF");
    await window.GuiViewer3D.loadModel(pdfURL);
    await window.GuiViewer3D.waitForLoadDone(); // Wait for models to be completely loaded

    // ---------------------------------------------
    // window.Markup.getSelection(); // Returns the currently selected markup
  });
};

const initializeMarkupCore = async () => {
  window.Markup = await window.GuiViewer3D.loadExtension(
    "Autodesk.Viewing.MarkupsCore"
  );
};

const initializeMarkupsGui = async () => {
  // Load the Markups Grafic Interface
  await window.GuiViewer3D.loadExtension("Autodesk.Viewing.MarkupsGui");
};

const loadMarkupsOnSheet = async () => {
  window.Markup.show(); // Enables loading of previously saved markups.
  window.Markup.loadMarkups(SVG_00, LAYER_ID);
  // window.Markup.enterEditMode(LAYER_ID);
  // window.Markup.leaveEditMode();
};

const loadMultiplesMarkupsOnSheet = async () => {
  window.Markup.show(); // Enables loading of previously saved markups.
  window.Markup.loadMarkups(SVG_01, "layer-id-01");
  window.Markup.loadMarkups(SVG_02, "layer-id-02");
  // window.Markup.enterEditMode();
  // window.Markup.leaveEditMode();
};

const selectMarkupById = (markupId) => {
  const markup = window.Markup.getMarkup(markupId);
  window.Markup.selectMarkup(markup);
};

const deleteMarkupById = (markupId) => {
  const markup = window.Markup.getMarkup(markupId);
  window.Markup.selectMarkup(markup);
  window.Markup.deleteMarkup(markup); //Deletes a markup from the canvas. Only applies while in Edit mode.
};

const deleteMarkupByIndex = (markupIndex) => {
  const layer = window.Markup.svgLayersMap[LAYER_ID];
  const markup = layer.markups[markupIndex];
  window.Markup.selectMarkup(markup);
  window.Markup.deleteMarkup(markup); //Deletes a markup from the canvas. Only applies while in Edit mode.
};

const listenerOnMarkupSelected = () => {
  window.Markup.addEventListener("EVENT_MARKUP_SELECTED", function (e) {
    var selectedMarkup = e.markup;
    console.log("selectedMarkup: ", selectedMarkup);
  });
};

const listenerOnEditModeLeave = () => {
  window.Markup.addEventListener("EVENT_EDITMODE_LEAVE", function (e) {
    const element = e;
    console.log("element: ", element);
  });
};

const listenerOnEditModeCreationEnd = () => {
  window.Markup.addEventListener("EVENT_EDITMODE_CREATION_END", function (e) {
    const element = e;
    console.log("element: ", element);
  });
};

initializeViewer("https://pdfobject.com/pdf/sample.pdf").then(async () => {
  await initializeMarkupCore();
  await initializeMarkupsGui();
  await loadMarkupsOnSheet();
  // await loadMultiplesMarkupsOnSheet();

  // Listeners
  listenerOnMarkupSelected();
  listenerOnEditModeLeave();
  listenerOnEditModeCreationEnd();
});
