'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var mod = _interopDefault(require('./mod'));

function main ()
{
	console.log('main', mod());
}

module.exports = main;
