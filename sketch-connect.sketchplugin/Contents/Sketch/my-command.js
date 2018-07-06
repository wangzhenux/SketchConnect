var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/my-command.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/my-command.js":
/*!***************************!*\
  !*** ./src/my-command.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var lineThickness;
var lineColor;
var lineThicknessInput;
var lineColorInput; // var groupCheckbox;
// var groupCheckboxInput;

/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var selectedLayers = context.selection;
  var selectedCount = selectedLayers.count();

  if (selectedCount < 2) {
    context.document.showMessage('At least 2 layers need to be selected.');
    return;
  } // Create window


  var window = createWindow(context);
  var alert = window[0];
  var response = alert.runModal();

  if (response != "1000") {
    return;
  } // Get line information


  lineThicknessInput = lineThickness.stringValue();
  lineColorInput = lineColor.stringValue(); // groupCheckboxInput = groupCheckbox.stringValue();

  var firstLayer = selectedLayers[0];
  var parent = firstLayer.parentGroup(); //context.document.showMessage(selectedLayers[0].frame().x());

  for (var i = 0; i < selectedCount; i++) {
    var a = selectedLayers[i];
    var aFrame = a.frame();
    var aMidX = aFrame.x() + aFrame.width() * 0.5;
    var aMidY = aFrame.y() + aFrame.height() * 0.5;

    for (var j = i + 1; j < selectedCount; j++) {
      var b = selectedLayers[j];
      var bFrame = b.frame();
      var bMidX = bFrame.x() + bFrame.width() * 0.5;
      var bMidY = bFrame.y() + bFrame.height() * 0.5;
      var line = drawLine(context, aMidX, aMidY, bMidX, bMidY, lineThicknessInput, lineColorInput, a.name(), b.name());
      parent.addLayers([line]);
      MSLayerMovement.moveToBack([line]);
    }
  }
});

function drawLine(context, x1, y1, x2, y2, thickness, color, aName, bName) {
  if (!thickness || !color) {
    // Use default settings
    thickness = 1;
    color = "#767676";
  }

  var document = context.document;
  var path = NSBezierPath.bezierPath();
  path.moveToPoint(NSMakePoint(x1, y1));
  path.lineToPoint(NSMakePoint(x2, y2));
  var line = MSShapeGroup.shapeWithBezierPath(MSPath.pathWithBezierPath(path));
  line.setName(aName + "-" + bName);
  var border = line.style().addStylePartOfType(1);
  border.color = MSImmutableColor.colorWithSVGString(color);
  border.thickness = thickness; // newBorder.color = MSImmutableColor.colorWithSVGString(color);
  // newBorder.thickness = thickness;
  //

  return line;
}

;

function createWindow(context) {
  // initVars(context);
  var alert = COSAlertWindow.new();
  alert.setMessageText("Configure Connecting Objects"); // Creating dialog buttons

  alert.addButtonWithTitle("Draw");
  alert.addButtonWithTitle("Cancel"); // Creating the view

  var viewWidth = 300;
  var viewHeight = 70;
  var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth, viewHeight)); // Creating the inputs

  lineThickness = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - 40, 130, 20));
  lineColor = NSTextField.alloc().initWithFrame(NSMakeRect(140, viewHeight - 40, 130, 20));
  var lineThicknessLabel = NSTextField.alloc().initWithFrame(NSMakeRect(-1, viewHeight - 20, viewWidth / 2 - 10, 20));
  var lineColorLabel = NSTextField.alloc().initWithFrame(NSMakeRect(140, viewHeight - 20, viewWidth / 2 - 10, 20)); // groupCheckbox = NSButton.alloc().initWithFrame(NSMakeRect(-1, viewHeight - 70, viewWidth - 10, 20));
  //
  // groupCheckbox.setButtonType(NSSwitchButton);
  // groupCheckbox.setBezelStyle(0);
  // groupCheckbox.setTitle("Group all generated lines.");
  // groupCheckbox.setState(NSOffState);

  lineThickness.setNextKeyView(lineColor);
  lineThicknessLabel.setStringValue("Line Thickness:");
  lineThicknessLabel.setSelectable(false);
  lineThicknessLabel.setEditable(false);
  lineThicknessLabel.setBezeled(false);
  lineThicknessLabel.setDrawsBackground(false);
  lineColorLabel.setStringValue("Line Color:");
  lineColorLabel.setSelectable(false);
  lineColorLabel.setEditable(false);
  lineColorLabel.setBezeled(false);
  lineColorLabel.setDrawsBackground(false); // Default values for textfield

  lineThickness.setStringValue('1');
  lineColor.setStringValue('#767676'); // Adding the textfield

  view.addSubview(lineThickness);
  view.addSubview(lineColor); // Adding the label

  view.addSubview(lineColorLabel);
  view.addSubview(lineThicknessLabel); // Add checkboxes
  // view.addSubview(groupCheckbox);

  alert.addAccessoryView(view); // Show the dialog

  return [alert];
}

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=my-command.js.map