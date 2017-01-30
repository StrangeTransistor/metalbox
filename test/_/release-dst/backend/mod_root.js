'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Rootpath = _interopDefault(require('rootpath'));

/*  */

var mod_root = () =>
{
	return Rootpath(__dirname)
};

module.exports = mod_root;
