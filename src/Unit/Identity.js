/* @flow */

import Unit from './Unit'

export default function Identity /* ::<T> */ () /* :$Identity<T> */
{
	return Unit(
	{
		family: 'Identity',

		unit (it /* :T */)
		{
			return it
		},
	})
}
