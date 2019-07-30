'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var TablePosition = require('../TablePosition');
var moveSelection = require('./moveSelection');

/**
 * Move selection by a {x,y} relative movement
 *
 * @param {Object} opts
 * @param {Slate.Editor} editor
 * @param {Number} x Move horizontally by x
 * @param {Number} y Move vertically by y
 * @return {Slate.Editor}
 */
function moveSelectionBy(opts, editor, x, y) {
    var value = editor.value;
    var startBlock = value.startBlock;


    if (!TablePosition.isInCell(value, startBlock, opts)) {
        throw new Error('moveSelectionBy can only be applied in a cell');
    }

    var pos = TablePosition.create(value, startBlock, opts);
    var rowIndex = pos.getRowIndex();
    var colIndex = pos.getColumnIndex();
    var width = pos.getWidth();
    var height = pos.getHeight();

    var _normPos = normPos(x + colIndex, y + rowIndex, width, height),
        _normPos2 = _slicedToArray(_normPos, 2),
        absX = _normPos2[0],
        absY = _normPos2[1];

    if (absX === -1) {
        // Out of table
        return editor;
    }

    return moveSelection(opts, editor, absX, absY);
}

/**
 * Normalize position in a table. If x is out of the row, update y accordingly
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @return {Array<Number>} [-1, -1] if the new selection is out of table
 */
function normPos(x, y, width, height) {
    if (x < 0) {
        x = width - 1;
        y--;
    }

    if (y < 0) {
        return [-1, -1];
    }

    if (x >= width) {
        x = 0;
        y++;
    }

    if (y >= height) {
        return [-1, -1];
    }

    return [x, y];
}

module.exports = moveSelectionBy;