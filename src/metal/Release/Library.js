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

import Fork   from '../../Unit/compose/Fork'

// import Debug   from '../../Unit/Debug'
// import Glob   from '../../Unit/Glob'
import Load   from '../../Unit/Entry/Load'
import Rebase from '../../Unit/Entry/Rebase'
import File   from '../../Unit/Entry/File'

import Feed from '../Unit/Feed'
import Es5 from '../Unit/Es5'
import FlowDecl from '../Unit/FlowDecl'
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

var types =
[
	'**/*.js.flow',
	'**/*.d.ts',
]

export default Recipe(
{
	recipe ()
	{
		return Code()
		.fork(Types())
		.fork(Other())
	},
})

function Code ()
{
	return TypeScript()
	.pre(JavaScript())
}


function JavaScript ()
{
	return Feed(Src('**/*.js'))
	.pipe(Fork(
		 Es5().pipe(Write()),
		Load().pipe(FlowDecl()).pipe(Write())
	))
}

function TypeScript ()
{
	return Feed(Src.Globs([ '**/*.ts', '!*.d.ts' ]))
	.pipe(Es5())
	.pipe(Write())
}

function Write ()
{
	return Rebase(Src(), Dst())
	.pipe(File())
}


function Types ()
{
	return MirrorCopy(types)
}

function Other ()
{
	return MirrorCopy(other, { nocase: true })
}
