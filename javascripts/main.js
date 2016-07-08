/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _radioSelector = __webpack_require__(1);

	var _radioSelector2 = _interopRequireDefault(_radioSelector);

	var _linearSelector = __webpack_require__(3);

	var _linearSelector2 = _interopRequireDefault(_linearSelector);

	var _selector = __webpack_require__(2);

	var _selector2 = _interopRequireDefault(_selector);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.fancySelector = {
	    createRadioSelector: function createRadioSelector(button) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	        return new _radioSelector2.default(button, options);
	    },
	    createLinearSelector: function createLinearSelector(button) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	        return new _linearSelector2.default(button, options);
	    },
	    RADS_360: _selector2.default.RADS_360,
	    RADS_90: _selector2.default.RADS_90,
	    RADS_180: _selector2.default.RADS_360 / 2,
	    RADS_45: _selector2.default.RADS_90 / 2,
	    RADS_30: _selector2.default.RADS_90 / 3,
	    RADS_0: 0
	};

	exports.default = window.fancySelector;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _selector = __webpack_require__(2);

	var _selector2 = _interopRequireDefault(_selector);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var RadioSelector = function RadioSelector(button, options) {
	    var offsetAngle = options.startingAngle || 0;

	    options.startingAngle = null;
	    this.offsetAngle = offsetAngle;
	    this.initialize(button, options);
	    this.createSelector();
	};

	RadioSelector.prototype = new _selector2.default();
	RadioSelector.prototype.constructor = RadioSelector;

	RadioSelector.prototype.incrementalFunction = function (list, angle, radius, offset, i) {
	    this.positionItem(list[i + 1], i * angle + this.offsetAngle, radius, offset);
	};

	RadioSelector.prototype.positionItem = function (item, angle, radius) {
	    var extraDistance = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

	    var widthDistance = Math.floor(Math.cos(angle) * radius);
	    var heightDistance = Math.floor(Math.sin(angle) * radius);
	    var widthExtra = Math.floor(Math.cos(angle) * extraDistance);
	    var heightExtra = Math.floor(Math.sin(angle) * extraDistance);

	    if (widthDistance !== 0) {
	        widthDistance += widthExtra;
	    }

	    if (heightDistance !== 0) {
	        heightDistance += heightExtra;
	    }

	    item.style.marginLeft = widthDistance + 'px';
	    item.style.marginTop = -1 * heightDistance + 'px';
	};

	exports.default = RadioSelector;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Selector = function Selector() {};

	Selector.RADS_360 = 2 * Math.PI;
	Selector.RADS_90 = Selector.RADS_360 / 4;
	Selector.RADS_180 = Selector.RADS_360 / 2;
	Selector.RADS_45 = Selector.RADS_90 / 2;
	Selector.RADS_30 = Selector.RADS_90 / 3;
	Selector.RADS_0 = 0;
	Selector.STEP = 100;
	Selector.SEPARATION = {
	    TIGHT: 50,
	    NORMAL: 6,
	    LOOSE: 3
	};

	Selector.prototype.initialize = function (button, options) {
	    this.button = button;
	    this.container = this.button.parentElement;
	    this.list = this.container.children;
	    this.minimumItems = options.minimumItems;
	    this.startingAngle = options.startingAngle;
	    this.nItemsAround = this.list.length - 1;
	};

	Selector.prototype.addListener = function () {
	    var selector = this;
	    this.button.addEventListener('click', function () {
	        var event = arguments[0] || window.event;
	        event.preventDefault();
	        if (!selector.isSpinning) {
	            selector.isSpinning = true;
	            selector.toggleButtons();
	        }
	    });
	};

	Selector.prototype.resetListenerAfter = function (base) {
	    var selector = this;
	    setTimeout(function () {
	        selector.addListener();
	    }, 500 + base);
	};

	Selector.prototype.displayNodes = function () {
	    for (var i = 1; i < this.list.length; i++) {
	        this.list[i].style.display = '';
	    }
	};

	Selector.prototype.resetPosition = function (item) {
	    item.style.marginLeft = 0;
	    item.style.marginTop = 0;
	    setTimeout(function () {
	        item.style.display = 'none';
	    }, 501);
	};

	Selector.prototype.getAngle = function () {
	    var baseAngle;
	    if (this.startingAngle === null || this.startingAngle === undefined) {
	        baseAngle = Selector.RADS_360 / this.nItemsAround;
	    } else {
	        baseAngle = this.startingAngle;
	    }
	    return baseAngle;
	};

	Selector.prototype.getTheoreticalRadius = function () {
	    var list = arguments.length <= 0 || arguments[0] === undefined ? this.list : arguments[0];

	    var circ = this.getCircumference(list);
	    return circ / Selector.RADS_360;
	};

	Selector.prototype.getCircumference = function (list) {
	    var circumference = 0;
	    for (var i = 1; i < list.length; i++) {
	        circumference += list[i].offsetWidth;
	    }
	    return circumference;
	};

	Selector.prototype.calculateAlternativeBaseAngle = function (originalAngle) {
	    var steps = Selector.RADS_360 / originalAngle - 1;
	    if (steps <= 0) {
	        steps = 1;
	    }
	    return Selector.RADS_90 / steps;
	};

	Selector.prototype.createAlternativeList = function (originalList, newAngle) {
	    var alternativeList = [];
	    var steps = Selector.RADS_360 / newAngle;
	    var originalLength = originalList.length;
	    for (var i = 0; i < steps; i++) {
	        alternativeList.push(originalList[i % originalLength]);
	    }
	    return alternativeList;
	};

	Selector.prototype.getDataForDisplayElems = function () {
	    var baseAngle;
	    var theoreticalRadius;
	    if (this.nItemsAround <= this.minimumItems) {
	        baseAngle = this.calculateAlternativeBaseAngle(this.getAngle());
	        theoreticalRadius = this.getTheoreticalRadius(this.createAlternativeList(this.list, baseAngle));
	    } else {
	        theoreticalRadius = this.getTheoreticalRadius();
	        baseAngle = this.getAngle();
	    }

	    return {
	        baseAngle: baseAngle,
	        theoreticalRadius: theoreticalRadius
	    };
	};

	Selector.prototype.toggleSpinningAfter = function (it) {
	    var time = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	    var selector = this;
	    setTimeout(function () {
	        if (it === selector.nItemsAround - 1) {
	            selector.isSpinning = false;
	        }
	    }, time);
	};

	Selector.prototype.toggleButtons = function () {
	    var selector = this;

	    this.container.classList.toggle('open');
	    if (this.container.classList.contains('open')) {
	        this.displayNodes();

	        var _getDataForDisplayEle = this.getDataForDisplayElems();

	        var baseAngle = _getDataForDisplayEle.baseAngle;
	        var theoreticalRadius = _getDataForDisplayEle.theoreticalRadius;

	        var _loop = function _loop(i) {
	            setTimeout(function () {
	                selector.incrementalFunction(selector.list, baseAngle, theoreticalRadius, selector.button.offsetWidth, i);
	                selector.toggleSpinningAfter(i);
	            }, 500 + i * Selector.STEP);
	        };

	        for (var i = 0; i < this.nItemsAround; i++) {
	            _loop(i);
	        }
	    } else {
	        setTimeout(function () {
	            for (var _i = 0; _i < selector.nItemsAround; _i++) {
	                selector.resetPosition(selector.list[_i + 1]);
	                selector.toggleSpinningAfter(_i, 501);
	            }
	        }, 501);
	    }
	};

	Selector.prototype.createSelector = function () {
	    this.addListener();
	};

	exports.default = Selector;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _selector = __webpack_require__(2);

	var _selector2 = _interopRequireDefault(_selector);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var LinearSelector = function LinearSelector(button, options) {
	    this.initialize(button, options);
	    this.createSelector();
	};

	LinearSelector.prototype = new _selector2.default();
	LinearSelector.prototype.constructor = LinearSelector;

	LinearSelector.prototype.incrementalFunction = function (list, angle, radius, offset, i) {
	    var calculatedDistance = (i + 1) * offset;
	    var sep = (i + 1) * this.separationToUse || calculatedDistance / _selector2.default.SEPARATION.NORMAL;
	    this.positionItem(list[i + 1], angle, calculatedDistance, sep);
	};

	LinearSelector.prototype.positionItem = function (item, angle, radius) {
	    var extraDistance = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

	    var widthDistance = Math.floor(Math.cos(angle) * radius);
	    var heightDistance = Math.floor(Math.sin(angle) * radius);
	    var widthExtra = Math.floor(Math.cos(angle) * extraDistance);
	    var heightExtra = Math.floor(Math.sin(angle) * extraDistance);

	    if (widthDistance !== 0) {
	        widthDistance += widthExtra;
	    }

	    if (heightDistance !== 0) {
	        heightDistance += heightExtra;
	    }

	    item.style.marginLeft = widthDistance + 'px';
	    item.style.marginTop = -1 * heightDistance + 'px';
	};

	exports.default = LinearSelector;

/***/ }
/******/ ]);