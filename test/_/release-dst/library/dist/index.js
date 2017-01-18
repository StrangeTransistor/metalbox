'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var sqr = _interopDefault(require('./dir/mod'));

/*       */

function cube (v        )
{
	return sqr(v) * v
}

module.exports = cube;
