/* @flow */

import tcomb from '../tcomb'

import Recipe from '../Recipe'
import Unit   from './Unit'

export default Recipe(
{
	args: [ tcomb.Number ],

	recipe (level /* :number */)
	{
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
	},
})
