'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var sqr = _interopDefault(require('./dir/mod'));
var mod2 = _interopDefault(require('./re-mod2'));

/*  */

function so () { return 1 - 1 }

so() && mod2();

function cube (v)
{
	return sqr(v) * v
}

module.exports = cube;
