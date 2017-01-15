/* @flow */

import os from 'os'

import mod_rootpath from './mod_root'
var rootpath = mod_rootpath()

0 && console.log(rootpath())
0 && console.log(os.arch())

import other_dirname from './dir/other-dirname'

0 && console.log(other_dirname)
