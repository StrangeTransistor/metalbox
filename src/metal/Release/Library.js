/* @flow */

import Recipe from '../../Recipe'

import Glob from '../../Unit/Glob'

import { Src } from '../focus'

// import Debug from '../../Unit/Debug'

// import Mutable from '../../Unit/Entry/Mutable'

import Es5 from '../Unit/Es5'

export default Recipe(
{
	recipe ()
	{
		return Glob(
			Src('test/origin/es6/**/*.js'),
			Es5()
		)
	},
})
