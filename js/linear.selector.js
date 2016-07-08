import Selector from './selector.js';

var LinearSelector = function (button, options) {
    this.initialize( button, options );
    this.createSelector();
};

LinearSelector.prototype = new Selector();
LinearSelector.prototype.constructor = LinearSelector;

LinearSelector.prototype.incrementalFunction = function (list, angle, radius, offset, i) {
    var calculatedDistance = (i + 1) * offset;
    var sep = (i + 1) * this.separationToUse || calculatedDistance / Selector.SEPARATION.NORMAL;
    this.positionItem(list[i + 1], angle, calculatedDistance, sep);
};

LinearSelector.prototype.positionItem = function (item, angle, radius, extraDistance = 0) {
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
    item.style.marginTop = (-1 * heightDistance) + 'px';
};


export default LinearSelector;
