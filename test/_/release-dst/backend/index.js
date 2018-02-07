'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var os = _interopDefault(require('os'));
var mod_rootpath = _interopDefault(require('./mod_root'));
var other_dirname = _interopDefault(require('./dir/other-dirname'));
var mod2 = _interopDefault(require('./re-mod2'));

/*  */

var rootpath = mod_rootpath();

function so () { return 1 - 1 }

so() && console.log(rootpath());
so() && console.log(os.arch());

so() && console.log(other_dirname);

so() && mod2();

var index = (argv) =>
{
	return argv.join(',')
}

module.exports = index;
