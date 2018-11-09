/* @flow */

import times from 'lodash/times'

import { stream } from 'flyd'

import tcomb from '../tcomb'

import Recipe from '../Recipe'
import Unit   from './Unit'

export default Recipe/* :: <[ ?string ], ?number, any, string> */(
{
	args: [ tcomb.maybe(tcomb.String) ],

	recipe (animal /* :?string */)
	{
		var Σanimal = (animal || 'Cow')

		return Unit(
		{
			family: 'Cow',
			input: tcomb.maybe(tcomb.Number),
			unit (num /* :?number */) /* :$Streaming<string> */
			{
				var Σnum = (num || 1)

				if (false)
				{
					return times(Σnum, () => Σanimal).join(' ')
				}
				else
				{
					/* @flow-off */
					var s = stream()

					times(Σnum, () => setTimeout(() => s(Σanimal), 0))

					setTimeout(() => s.end(true), 0)

					return s
				}
			},
		})
	},
})
