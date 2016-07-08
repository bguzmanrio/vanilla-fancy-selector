var Selector = function () {};

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
    for (let i = 1; i < this.list.length; i++) {
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
        baseAngle = (Selector.RADS_360) / (this.nItemsAround);
    } else {
        baseAngle = this.startingAngle;
    }
    return baseAngle;
};

Selector.prototype.getTheoreticalRadius = function (list = this.list) {
    var circ = this.getCircumference(list);
    return circ / (Selector.RADS_360);
};

Selector.prototype.getCircumference = function (list) {
    var circumference = 0;
    for (let i = 1; i < list.length; i++) {
        circumference += list[i].offsetWidth;
    }
    return circumference;
};

Selector.prototype.calculateAlternativeBaseAngle = function (originalAngle) {
    var steps = (Selector.RADS_360 / originalAngle) - 1;
    if (steps <= 0) {
        steps = 1;
    }
    return Selector.RADS_90 / steps;
};

Selector.prototype.createAlternativeList = function (originalList, newAngle) {
    var alternativeList = [];
    var steps = Selector.RADS_360 / newAngle;
    var originalLength = originalList.length;
    for (let i = 0; i < steps; i++) {
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

Selector.prototype.toggleSpinningAfter = function (it, time = 0) {
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
        var {
            baseAngle, theoreticalRadius
        } = this.getDataForDisplayElems();

        for (let i = 0; i < this.nItemsAround; i++) {
            setTimeout(function () {
                selector.incrementalFunction(selector.list, baseAngle, theoreticalRadius, selector.button.offsetWidth, i);
                selector.toggleSpinningAfter(i);
            }, 500 + (i * Selector.STEP));
        }
    } else {
        setTimeout(function () {
            for (let i = 0; i < selector.nItemsAround; i++) {
                selector.resetPosition(selector.list[i + 1]);
                selector.toggleSpinningAfter(i, 501);
            }
        }, 501);
    }
};

Selector.prototype.createSelector = function () {
    this.addListener();
};

export default Selector;
