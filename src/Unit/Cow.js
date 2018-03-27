/* @flow */

import Unit from './Unit'

export default function Cow (level /* :number */)
{
	return Unit((input /* :any */) =>
	{
		console.log('there is no cow level')
		console.log(level)
		console.log(input)
		return String(level) + String(input)
	})
}
