function disableLayerMarkups(layer, disable) {
  if (layer) {
    var layerMarkups = layer.markups;
    for (var k = 0; k < layerMarkups.length; k++) {
      var m = layerMarkups[k];
      m.disableInteractions(disable);
    }
  }
}

// Base: MarkupsCore.prototype.enterEditMode
export const enableMarkupsSelection = async (layerId) => {
  // The EditModeSelector file has dependencies on Autodesk.Extensions.Markup.Core
  // and can only be loaded after Autodesk Viewer is launched.
  const { EditModeSelector } = await import("./edit-modes/EditModeSelector.js");

  console.log("enableMarkupsSelection");
  if (layerId) {
    if (!window.Markup.svgLayersMap[layerId]) {
      // if layerId is supplied but it does not exist in the svgLayerMap then create the new layer
      console.warn("No such layer exists.");
      return false;
    }
  }

  // If not currently shown, then show
  if (!window.Markup.duringViewMode) {
    if (!window.Markup.show()) {
      return false; // Failed to enter view mode.
    }
  }

  // // Initialize the edit mode layer if it does not exist
  if (!window.Markup.editModeSvgLayerNode) {
    var parSvg = window.Markup.createSvgElement("g");
    window.Markup.editModeSvgLayerNode = {
      markups: [],
      svg: parSvg,
    };
    window.Markup.editModeSvgLayerNode.svg.setAttribute("cursor", "default");
  }

  if (
    window.Markup.editModeSvgLayerNode.svg.parentNode != window.Markup.svg ||
    !layerId
  ) {
    window.Markup.svg.appendChild(window.Markup.editModeSvgLayerNode.svg);
  }
  window.Markup.svg.setAttribute("cursor", "crosshair");

  if (layerId) {
    var layer = window.Markup.svgLayersMap[layerId];
    // If the layer exists in the layer map, use the information stored for that specific layer.
    if (layer) {
      // Remove the edit layer when entering edit mode of a specific edit mode.
      var editModeLayerParentNode =
        window.Markup.editModeSvgLayerNode.svg.parentNode;
      editModeLayerParentNode &&
        editModeLayerParentNode.removeChild(
          window.Markup.editModeSvgLayerNode.svg
        );

      // disable the markups in the editModeLayer
      disableLayerMarkups(window.Markup.editModeSvgLayerNode, true);

      // Enable interactions for markups in the current edit layer and disable interactions for markups in
      // the other layers.
      for (var key in window.Markup.svgLayersMap) {
        var markups = window.Markup.svgLayersMap[key].markups;
        for (var i = 0; i < markups.length; i++) {
          var markup = markups[i];
          if (key !== layerId.toString()) {
            // disable all not in the current layer.
            markup.disableInteractions(true);
          } else {
            // enable all markups in current layer.
            markup.disableInteractions(false);
          }
        }
      }

      // assign the current layer to the global active layer
      window.Markup.activeLayer = layerId;
      window.Markup.editingLayer = layerId;
      var svgParent = layer.svg;

      // remove previous svg layer child from svg
      svgParent.parentNode && window.Markup.svg.removeChild(svgParent);

      // reassign the markups in that layer to the global markups list
      window.Markup.markups = layer.markups.slice();

      // re-append svg layer child to svg to make it the top most layer
      window.Markup.svg.appendChild(svgParent);
    }
  } else {
    // disable interactions for the previous markups
    // Example: enterEditMode(layer) -> enterEditMode()
    if (window.Markup.editingLayer) {
      for (var k = 0; k < window.Markup.markups.length; k++) {
        var m = window.Markup.markups[k];
        m.disableInteractions(true);
      }
      disableLayerMarkups(window.Markup.editModeSvgLayerNode, false);
    }
    window.Markup.editingLayer = "";
    if (!window.Markup.editModeSvgLayerNode) {
      window.Markup.markups = [];
    } else {
      window.Markup.markups =
        window.Markup.editModeSvgLayerNode.markups.slice();
    }
    window.Markup.activeLayer = "";
  }

  window.Markup.input.enterEditMode();
  window.Markup.activateTool(true);
  window.Markup.styles = {}; // Clear EditMode styles.
  window.Markup.defaultStyle = null;
  window.Markup.duringEditMode = true;
  window.Markup.changeEditMode(new EditModeSelector(window.Markup));
  window.Markup.actionManager.clear(); // Clears the action history (Same as used for 'undo' and 'redo' actions)
  window.Markup.dispatchEvent({ type: "EVENT_EDITMODE_ENTER" });
  window.Markup.allowNavigation(false);
  return true;
};
