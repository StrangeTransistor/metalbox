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
// import Rebase from '../../Unit/Entry/Rebase'
import Copy from '../../Unit/File/Copy'

import { Src } from '../focus'
// import { Dst } from '../focus'

// import Debug from '../../Unit/Debug'

// import Mutable from '../../Unit/Entry/Mutable'

// import Es5 from '../Unit/Es5'

export default Recipe(
{
	recipe ()
	{
		return Glob(Src('**/*.md'))
		// .pipe(Rebase(Src(), Dst()))
		.pipe(Copy(
			entry => entry.filename,
			(entry, { providers: { src, dst }})
			 => dst(src.relative(entry.filename))
		))
		// .pipe(Debug('MD'))

		// return Glob(Src('test/origin/es6/**/*.js'))
		// .pipe(Es5())
	},
})
