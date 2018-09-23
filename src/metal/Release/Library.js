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

// import Debug from '../../Unit/Debug'
// import Mutable from '../../Unit/Entry/Mutable'

// import Es5 from '../Unit/Es5'
import MirrorCopy from '../Unit/MirrorCopy'

export default Recipe(
{
	recipe ()
	{
		return MirrorCopy('**/*.md')
		.fork(MirrorCopy('**/*.txt'))

		// return Glob(Src('test/origin/es6/**/*.js'))
		// .pipe(Es5())
	},
})
