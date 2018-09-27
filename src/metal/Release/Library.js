/* @flow */
// TODO: transform package.json
// +manifest?
// TODO: transform hjson?

// TODO: mode: es6
// TODO: mode: origin
// TODO: mode: combine (+obfuscate)

// TODO: copy flow, extract ts types
// TODO: copy run

// TODO: ignore coverage, test, tests, release, node_modules

import Recipe from '../../Recipe'

import Glob from '../../Unit/Glob'
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
	'license',
]

export default Recipe(
{
	recipe ()
	{
		return Code()
		.fork(MirrorCopy(other, { nocase: true }))
	},
})

function Code ()
{
	return TypeScript()
	.pre(JavaScript())
}


function JavaScript ()
{
	return Glob(Src('**/*.js'))
	.pipe(Es5())
	.pipe(Rebase(Src(), Dst()))
	.pipe(File())
}

function TypeScript ()
{
	return Glob(Src('**/*.ts'))
	.pipe(Es5())
	.pipe(Rebase(Src(), Dst()))
	.pipe(File())
}
