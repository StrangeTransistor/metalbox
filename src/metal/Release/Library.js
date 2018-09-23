/* @flow */
// package.json
// +manifest?
// transform js
// flow, ts types
// run
// other:
// copy json, hjson, md, license
// ignore: coverage, test, tests, release, node_modules

import Recipe from '../../Recipe'

import Glob from '../../Unit/Glob'
// import Debug from '../../Unit/Debug'
import Rebase from '../../Unit/Entry/Rebase'
import File from '../../Unit/Entry/File'

import Es5 from '../Unit/Es5'
import MirrorCopy from '../Unit/MirrorCopy'

import { Src } from '../focus'
import { Dst } from '../focus'

var other =
[
	'**/*.md',
	'**/*.txt',

	'readme',
	'Readme',
	'README'
]

export default Recipe(
{
	recipe ()
	{
		return JavaScript()
		.fork(MirrorCopy(other))
	},
})

function JavaScript ()
{
	return Glob(Src('**/*.js'))
	.pipe(Es5())
	.pipe(Rebase(Src(), Dst()))
	// .pipe(Debug())
	.pipe(File())
}
