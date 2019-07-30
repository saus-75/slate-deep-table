'use strict';

var Immutable = require('immutable');
var Slate = require('slate');
var createCell = require('./createCell');

/**
 * Create a new row block
 *
 * @param {Object} opts
 * @param {Number} columns
 * @param {Function} textGetter
 * @return {State.Block}
 */
function createRow(opts, columns, textGetter) {
    var cellNodes = Immutable.Range(0, columns).map(function (i) {
        return createCell(opts, textGetter ? textGetter(i) : '');
    }).toList();

    return Slate.Block.create({
        type: opts.typeRow,
        nodes: cellNodes
    });
}

module.exports = createRow;