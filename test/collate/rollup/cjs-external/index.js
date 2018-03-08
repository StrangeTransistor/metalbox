'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var mod = require('./mod');
var mod__default = _interopDefault(mod);

function main ()
{
	console.log('main', mod__default());
	console.log('main', mod.mod1());
}

module.exports = main;
