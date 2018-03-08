'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var once = _interopDefault(require('lodash/once'));

function mod ()
{
	return 'mod'
}

var mod1 = once(() =>
{
	return 'mod1'
});

function main ()
{
	console.log('main', mod());
	console.log('main', mod1());
}

module.exports = main;
