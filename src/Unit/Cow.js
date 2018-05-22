/* @flow */

import tcomb from 'tcomb'

import Unit from './Unit'

export default function Cow (level /* :number */)
{
	return Unit(
	{
		family: 'Cow',
		input: tcomb.Number,
		unit (input /* :number */)
		{
			console.log('there is no cow level')
			console.log(level)
			console.log(input)
			return String(level) + String(input)
		},
	})
}
