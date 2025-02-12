export default () => {
  // Base: window.markupsCore.prototype.enterEditMode
  window.window.markupsCore.enterSelectionMode = (layerId) => {
    const disableLayerMarkups = (layer, disable) => {
      if (layer) {
        var layerMarkups = layer.markups;
        for (var k = 0; k < layerMarkups.length; k++) {
          var m = layerMarkups[k];
          m.disableInteractions(disable);
        }
      }
    }

    if (layerId) {
      if (!window.markupsCore.svgLayersMap[layerId]) {
        // if layerId is supplied but it does not exist in the svgLayerMap then create the new layer
        console.warn("No such layer exists.");
        return false;
      }
    }

    // If not currently shown, then show
    if (!window.markupsCore.duringViewMode) {
      if (!window.markupsCore.show()) {
        return false; // Failed to enter view mode.
      }
    }

    // // Initialize the edit mode layer if it does not exist
    if (!window.markupsCore.editModeSvgLayerNode) {
      var parSvg = window.markupsCore.createSvgElement("g");
      window.markupsCore.editModeSvgLayerNode = {
        markups: [],
        svg: parSvg,
      };
      window.markupsCore.editModeSvgLayerNode.svg.setAttribute("cursor", "default");
    }

    if (
      window.markupsCore.editModeSvgLayerNode.svg.parentNode != window.markupsCore.svg ||
      !layerId
    ) {
      window.markupsCore.svg.appendChild(window.markupsCore.editModeSvgLayerNode.svg);
    }
    window.markupsCore.svg.setAttribute("cursor", "crosshair");

    if (layerId) {
      var layer = window.markupsCore.svgLayersMap[layerId];
      // If the layer exists in the layer map, use the information stored for that specific layer.
      if (layer) {
        // Remove the edit layer when entering edit mode of a specific edit mode.
        var editModeLayerParentNode =
          window.markupsCore.editModeSvgLayerNode.svg.parentNode;
        editModeLayerParentNode &&
          editModeLayerParentNode.removeChild(
            window.markupsCore.editModeSvgLayerNode.svg
          );

        // disable the markups in the editModeLayer
        disableLayerMarkups(window.markupsCore.editModeSvgLayerNode, true);

        // Enable interactions for markups in the current edit layer and disable interactions for markups in
        // the other layers.
        for (var key in window.markupsCore.svgLayersMap) {
          var markups = window.markupsCore.svgLayersMap[key].markups;
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
        window.markupsCore.activeLayer = layerId;
        window.markupsCore.editingLayer = layerId;
        var svgParent = layer.svg;

        // remove previous svg layer child from svg
        svgParent.parentNode && window.markupsCore.svg.removeChild(svgParent);

        // reassign the markups in that layer to the global markups list
        window.markupsCore.markups = layer.markups.slice();

        // re-append svg layer child to svg to make it the top most layer
        window.markupsCore.svg.appendChild(svgParent);
      }
    } else {
      // enables interaction with all layers
      var layers = Object.keys(window.markupsCore.svgLayersMap);
      layers.forEach(id => {
        // reassign the markups in each layer to the global markups list
        window.markupsCore.markups = [
          ...window.markupsCore.markups,
          ...window.markupsCore.svgLayersMap[id].markups.slice()
        ];
      });
    }

    window.markupsCore.input.enterEditMode();
    window.markupsCore.activateTool(true);
    window.markupsCore.styles = {}; // Clear EditMode styles.
    window.markupsCore.defaultStyle = null;
    window.markupsCore.duringEditMode = true;
    window.markupsCore.changeEditMode(new Autodesk.Extensions.Markup.Core.EditModeSelector(window.markupsCore));
    window.markupsCore.actionManager.clear(); // Clears the action history (Same as used for 'undo' and 'redo' actions)
    window.markupsCore.dispatchEvent({ type: Autodesk.Extensions.Markup.Core.MarkupEvents.EVENT_EDITMODE_ENTER });
    window.markupsCore.allowNavigation(false);
    return true;
  };
}