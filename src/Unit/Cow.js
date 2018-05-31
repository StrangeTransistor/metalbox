/* @flow */

import tcomb from 'tcomb'

import Unit from './Unit'

export default function Cow (level /* :number */)
{
	tcomb.Number(level)

	return Unit(
	{
		family: 'Cow',
		input: tcomb.Number,
		unit (input /* :number */)
		{
			console.log(`make  ${typeof level} ${level}`)
			console.log(`input ${typeof input} ${input}`)

			return (level + input)
		},
	})
}
