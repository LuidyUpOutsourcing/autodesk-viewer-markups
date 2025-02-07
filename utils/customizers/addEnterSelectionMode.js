export default () => {
  // Base: MarkupsCore.prototype.enterEditMode
  window.markupsCore.enterSelectionMode = (layerId, markupsCore) => {
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
      if (!markupsCore.svgLayersMap[layerId]) {
        // if layerId is supplied but it does not exist in the svgLayerMap then create the new layer
        console.warn("No such layer exists.");
        return false;
      }
    }

    // If not currently shown, then show
    if (!markupsCore.duringViewMode) {
      if (!markupsCore.show()) {
        return false; // Failed to enter view mode.
      }
    }

    // // Initialize the edit mode layer if it does not exist
    if (!markupsCore.editModeSvgLayerNode) {
      var parSvg = markupsCore.createSvgElement("g");
      markupsCore.editModeSvgLayerNode = {
        markups: [],
        svg: parSvg,
      };
      markupsCore.editModeSvgLayerNode.svg.setAttribute("cursor", "default");
    }

    if (
      markupsCore.editModeSvgLayerNode.svg.parentNode != markupsCore.svg ||
      !layerId
    ) {
      markupsCore.svg.appendChild(markupsCore.editModeSvgLayerNode.svg);
    }
    markupsCore.svg.setAttribute("cursor", "crosshair");

    if (layerId) {
      var layer = markupsCore.svgLayersMap[layerId];
      // If the layer exists in the layer map, use the information stored for that specific layer.
      if (layer) {
        // Remove the edit layer when entering edit mode of a specific edit mode.
        var editModeLayerParentNode =
          markupsCore.editModeSvgLayerNode.svg.parentNode;
        editModeLayerParentNode &&
          editModeLayerParentNode.removeChild(
            markupsCore.editModeSvgLayerNode.svg
          );

        // disable the markups in the editModeLayer
        disableLayerMarkups(markupsCore.editModeSvgLayerNode, true);

        // Enable interactions for markups in the current edit layer and disable interactions for markups in
        // the other layers.
        for (var key in markupsCore.svgLayersMap) {
          var markups = markupsCore.svgLayersMap[key].markups;
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
        markupsCore.activeLayer = layerId;
        markupsCore.editingLayer = layerId;
        var svgParent = layer.svg;

        // remove previous svg layer child from svg
        svgParent.parentNode && markupsCore.svg.removeChild(svgParent);

        // reassign the markups in that layer to the global markups list
        markupsCore.markups = layer.markups.slice();

        // re-append svg layer child to svg to make it the top most layer
        markupsCore.svg.appendChild(svgParent);
      }
    } else {
      // disable interactions for the previous markups
      // Example: enterEditMode(layer) -> enterEditMode()
      if (markupsCore.editingLayer) {
        for (var k = 0; k < markupsCore.markups.length; k++) {
          var m = markupsCore.markups[k];
          m.disableInteractions(true);
        }
        disableLayerMarkups(markupsCore.editModeSvgLayerNode, false);
      }
      markupsCore.editingLayer = "";
      if (!markupsCore.editModeSvgLayerNode) {
        markupsCore.markups = [];
      } else {
        markupsCore.markups =
          markupsCore.editModeSvgLayerNode.markups.slice();
      }
      markupsCore.activeLayer = "";
    }

    markupsCore.input.enterEditMode();
    markupsCore.activateTool(true);
    markupsCore.styles = {}; // Clear EditMode styles.
    markupsCore.defaultStyle = null;
    markupsCore.duringEditMode = true;
    markupsCore.changeEditMode(new Autodesk.Extensions.Markup.Core.EditModeSelector(markupsCore));
    markupsCore.actionManager.clear(); // Clears the action history (Same as used for 'undo' and 'redo' actions)
    markupsCore.dispatchEvent({ type: Autodesk.Extensions.Markup.Core.MarkupEvents.EVENT_EDITMODE_ENTER });
    markupsCore.allowNavigation(false);
    return true;
  };
}