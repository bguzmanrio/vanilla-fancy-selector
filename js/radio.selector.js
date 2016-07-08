import Selector from './selector.js';

var RadioSelector = function (button, options={}) {
    var offsetAngle = options.startingAngle || 0 ;
    
    options.startingAngle = null;
    this.offsetAngle = offsetAngle;
    this.initialize( button, options );
    this.createSelector();
};

RadioSelector.prototype = new Selector();
RadioSelector.prototype.constructor = RadioSelector;

RadioSelector.prototype.incrementalFunction = function (list, angle, radius, offset, i) {
    this.positionItem(list[i + 1], (i * angle) + this.offsetAngle, radius, offset);
};

RadioSelector.prototype.positionItem = function (item, angle, radius, extraDistance = 0) {
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

export default RadioSelector;
