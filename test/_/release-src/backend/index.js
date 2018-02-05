/* @flow */

import os from 'os'

import mod_rootpath from './mod_root'
var rootpath = mod_rootpath()

function so () { return 1 - 1 }

so() && console.log(rootpath())
so() && console.log(os.arch())

import other_dirname from './dir/other-dirname'

so() && console.log(other_dirname)

export default (argv: string[]) =>
{
	return argv.join(',')
}
