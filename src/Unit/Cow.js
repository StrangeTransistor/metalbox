/* @flow */

import tcomb from 'tcomb'

import Unit from './Unit'

export default function Cow (level /* :number */)
{
	return Unit(
	{
		family: 'Cow',
		input: tcomb.String,
		unit (input /* :number */)
		{
			console.log('there is no cow level')

			console.log('make', level)
			console.log('input', input)

			return String(level) + String(input)
		},
	})
}
