/**
 * Creates markups from a parsed svg string child
 * @param child - child of a parsed SVG string
 * @param editor - MarkupsCore
 * @returns {*} Markup Object
 */
export var createMarkupFromSVG = function (child, editor) {
  // var self = this;
  if (!child.childNodes[0]) {
    return null;
  }

  var meta = child.childNodes[0].childNodes[0] || "";

  var getCurrentStyle = function (editor, metadata) {
    var source = [
      "stroke-width",
      "stroke-color",
      "stroke-opacity",
      "fill-color",
      "fill-opacity",
      "font-family",
      "font-size",
      "font-style",
      "font-weight",
      "stroke-linejoin",
    ];
    var style = {};
    for (var i = 0; i < source.length; i++) {
      var value = metadata.getAttribute(source[i]);
      if (value == null) {
        continue;
      }
      switch (source[i]) {
        case "font-size":
        case "stroke-width":
        case "stroke-opacity":
        case "fill-opacity":
          style[source[i]] = parseFloat(value);
          break;
        case "stroke-linejoin":
          break;
        case "font-family":
        case "font-style":
        case "font-weight":
        case "stroke-color":
        case "text-data":
        case "fill-color":
          style[source[i]] = value;
          break;
        default:
          avp.logger.warn("Style not recognized.");
          break;
      }
    }
    return style;
  };

  var isClosed = function () {
    var path = child.childNodes[1] || "";
    var closed = false;
    if (typeof path !== "string") {
      var d = path.getAttribute("d").split(" ");
      if (d[d.length - 1].toLowerCase() === "z") {
        closed = true;
      }
    }
    return closed;
  };

  var getLocations = function () {
    var locations = [];
    var locStr = meta.getAttribute("locations").split(" ") || "";

    for (var i = 0; i < locStr.length; i += 2) {
      var pointPair = {
        x: parseFloat(locStr[i]),
        y: parseFloat(locStr[i + 1]),
      };
      locations.push(pointPair);
    }
    return locations;
  };

  var getAttributeVector = function (attribute) {
    var posVec = new THREE.Vector3();
    var value =
      meta.getAttribute(attribute) ||
      meta.getAttribute(attribute.toLowerCase());
    var strPos = value.split(" ");
    posVec.x = parseFloat(strPos[0]);
    posVec.y = parseFloat(strPos[1]);
    return posVec;
  };

  var getPosition = function () {
    return getAttributeVector("position");
  };

  var getSize = function () {
    return getAttributeVector("size");
  };

  var getRotation = function () {
    var strRot = meta.getAttribute("rotation") || "";
    return parseFloat(strRot);
  };

  var getText = function () {
    return meta.getAttribute("text") || "";
  };

  var getIsFrameUsed = function () {
    return !!parseInt(meta.getAttribute("isframeused"));
  };

  if (typeof meta !== "string") {
    // get the type of the child
    var position,
      size,
      rotation,
      locations,
      tail,
      head,
      closed,
      text,
      firstAnchor,
      secondAnchor;
    var id = editor.getId();
    var style = getCurrentStyle(editor, meta);
    var type = meta.getAttribute("type") || "";
    var createMarkup;
    switch (type) {
      case MarkupType.MARKUP_TYPE_ARROW:
        tail = getAttributeVector("tail");
        head = getAttributeVector("head");
        createMarkup = new CreateArrow(editor, id, tail, head, style);
        break;

      case MarkupType.MARKUP_TYPE_RECTANGLE:
        position = getPosition();
        size = getSize();
        rotation = getRotation();
        createMarkup = new CreateRectangle(
          editor,
          id,
          position,
          size,
          rotation,
          style
        );
        break;

      case MarkupType.MARKUP_TYPE_TEXT:
        position = getPosition();
        size = getSize();
        text = getText();
        createMarkup = new CreateText(editor, id, position, size, text, style);
        break;

      case MarkupType.MARKUP_TYPE_CALLOUT:
        position = getPosition();
        size = getSize();
        text = getText();
        var isFrameUsed = getIsFrameUsed();
        createMarkup = new CreateCallout(
          editor,
          id,
          position,
          size,
          text,
          style,
          isFrameUsed
        );
        break;

      case MarkupType.MARKUP_TYPE_CIRCLE:
        position = getPosition();
        size = getSize();
        rotation = getRotation();
        createMarkup = new CreateCircle(
          editor,
          id,
          position,
          size,
          rotation,
          style
        );
        break;

      case MarkupType.MARKUP_TYPE_CLOUD:
        position = getPosition();
        size = getSize();
        rotation = getRotation();
        createMarkup = new CreateCloud(
          editor,
          id,
          position,
          size,
          rotation,
          style
        );
        break;

      case MarkupType.MARKUP_TYPE_FREEHAND:
        position = getPosition();
        size = getSize();
        rotation = getRotation();
        locations = getLocations();
        createMarkup = new CreateFreehand(
          editor,
          id,
          position,
          size,
          rotation,
          locations,
          style
        );
        break;

      case MarkupType.MARKUP_TYPE_POLYLINE:
        position = getPosition();
        size = getSize();
        rotation = getRotation();
        locations = getLocations();
        closed = isClosed();
        createMarkup = new CreatePolyline(
          editor,
          id,
          position,
          size,
          rotation,
          locations,
          style,
          closed
        );
        break;

      case MarkupType.MARKUP_TYPE_POLYCLOUD:
        position = getPosition();
        size = getSize();
        rotation = getRotation();
        locations = getLocations();
        closed = isClosed();
        createMarkup = new CreatePolycloud(
          editor,
          id,
          position,
          size,
          rotation,
          locations,
          style,
          closed
        );
        break;

      case MarkupType.MARKUP_TYPE_HIGHLIGHT:
        position = getPosition();
        size = getSize();
        rotation = getRotation();
        locations = getLocations();
        createMarkup = new CreateHighlight(
          editor,
          id,
          position,
          size,
          rotation,
          locations,
          style
        );
        break;

      case MarkupType.MARKUP_TYPE_DIMENSION:
        firstAnchor = getAttributeVector("firstAnchor");
        secondAnchor = getAttributeVector("secondAnchor");
        text = getText();
        createMarkup = new CreateDimension(
          editor,
          id,
          firstAnchor,
          secondAnchor,
          text,
          style
        );
        break;

      case MarkupType.MARKUP_TYPE_STAMP:
        position = getPosition();
        size = getSize();
        rotation = getRotation();
        createMarkup = new CreateStamp(
          editor,
          id,
          position,
          size,
          rotation,
          style,
          child
        );
        break;

      default:
        createMarkup = null;
        break;
    }
    if (createMarkup) {
      createMarkup.addToHistory = false;
      createMarkup.execute();
      var markupList = editor.svgLayersMap[editor.activeLayer].markups;

      for (var i = 0; i < markupList.length; ++i) {
        if (markupList[i].id === id) {
          return markupList[i];
        }
      }
    }
    return null;
  }
};

export var stringToSvgNode = function (stringNode) {
  var node = null;
  try {
    var domParser = new DOMParser();
    var doc = domParser.parseFromString(stringNode, "text/xml");
    node = doc.firstChild; // We should only be getting 1 child anyway.
  } catch (err) {
    node = null;
    console.warn(
      "stringToSvgNode failed to generate an HTMLElement from its string representation."
    );
  }
  return node;
};

/**
 * Loads data (SVG string) for all markups in a specified layer (layerId) to the Viewer's canvas.<br>
 *
 * See also
 * {@link /en/docs/viewer/v7/reference/Extensions/MarkupsCore/#unloadmarkups-layerid|unloadMarkups()}, and
 * {@link /en/docs/viewer/v7/reference/Extensions/MarkupsCore/#hidemarkups-layerid|hideMarkups()}.
 *
 * @memberof Autodesk.Viewing.Extensions.MarkupsCore
 * @alias Autodesk.Viewing.Extensions.MarkupsCore.loadMarkups
 * @method loadMarkups
 *
 * @param {string} markupString - SVG string with markups. See also {@link /en/docs/viewer/v7/reference/Extensions/MarkupsCore/#generatedata|generateData()}.
 * @param {string} layerId - Identifier for the layer where the markup should be loaded to. Example "Layer1".
 * @returns {boolean} Whether the markup string was able to be loaded successfully
 */
const loadMarkups = (markupString, layerId) => {
  if (window.Markup.duringEditMode) {
    console.warn("Markups will not be loaded during the edit mode");
    return false;
  }

  if (!window.Markup.duringViewMode) {
    return false;
  }

  if (!layerId) {
    console.warn("loadMarkups failed; missing 2nd argument 'layerId'");
    return false;
  }

  // Can it be parsed into SVG?
  var parent = stringToSvgNode(markupString);
  if (!parent) {
    return false;
  }

  // If the supplied layerId exists in the svg layers map and there are children in the svg then return false.
  if (
    layerId in window.Markup.svgLayersMap &&
    window.Markup.svg.childNodes.length > 0
  ) {
    console.warn("This layer is already loaded, will not load again.");
    return false;
  }
  window.Markup.activeLayer = layerId;
  var svgLayerNode = window.Markup.svgLayersMap[layerId];

  // if the layer exists, delete it
  if (svgLayerNode) delete window.Markup.svgLayersMap[layerId];

  // create an empty parent svg layer node for layerId
  // Child markups will get added to th parent svg layer node in the addMarkup function
  var newSvg = window.Markup.createLayerNode();

  svgLayerNode = {
    markups: [],
    svgString: markupString,
    svg: newSvg,
  };
  window.Markup.svgLayersMap[layerId] = svgLayerNode;

  var children = parent.childNodes;
  for (var i = 0; i < children.length; i++) {
    var child = children[i];
    var markup = createMarkupFromSVG(child, this);
    // Disable markups if already in edit mode and the active layer is different
    if (
      markup &&
      window.Markup.duringEditMode &&
      window.Markup.editingLayer !== window.Markup.activeLayer
    ) {
      markup.disableInteractions(true);
    }

    if (!markup && child.localName !== "metadata") {
      // Append child removes it from parent and copies it over to the new svg layer node,
      // so we need to reduce index by 1 to continue proper iteration
      svgLayerNode.svg.appendChild(child);
      i--;
      if (typeof child.setAttribute === "function") {
        child.setAttribute("pointer-events", "none");
      }
    }
  }

  var svgParentNode = window.Markup.svgLayersMap[window.Markup.activeLayer].svg;

  window.Markup.svg.appendChild(svgParentNode);
  // If already in an edit mode layer then reassign active layer to edit layer
  if (
    window.Markup.duringEditMode &&
    window.Markup.editingLayer !== window.Markup.activeLayer
  ) {
    window.Markup.activeLayer = window.Markup.editingLayer;
    if (window.Markup.editingLayer)
      window.Markup.markups =
        window.Markup.svgLayersMap[window.Markup.activeLayer].markups.slice();
  }
  return true;
};
