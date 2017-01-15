'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var os = _interopDefault(require('os'));
var mod_rootpath = _interopDefault(require('./mod_root'));
var other_dirname = _interopDefault(require('./dir/other-dirname'));

/*       */

var rootpath = mod_rootpath();

0 && console.log(rootpath());
0 && console.log(os.arch());

0 && console.log(other_dirname);

var index = (argv          ) =>
{
	return argv.join(',')
};

module.exports = index;
