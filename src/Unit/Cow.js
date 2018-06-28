/* @flow */

import times from 'lodash/times'

import tcomb from '../tcomb'

import Recipe from '../Recipe'
import Unit   from './Unit'

export default Recipe(
{
	args: [ tcomb.maybe(tcomb.String) ],

	recipe (animal /* :?string */)
	{
		var Σanimal = (animal || 'Cow')

		return Unit(
		{
			family: 'Cow',
			input: tcomb.maybe(tcomb.Number),
			unit (num /* :?number */)
			{
				var Σnum = (num || 1)

				console.log(`animal ${typeof Σanimal} ${Σanimal}`)
				console.log(`num ${typeof Σnum} ${Σnum}`)

				var line = times(Σnum, () => Σanimal).join(' ')
				console.log(line)

				return true
			},
		})
	},
})
