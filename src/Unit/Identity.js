/* @flow */

import Unit from './Unit'

export default function Identity /* ::<T> */ () /* :$Identity<T> */
{
	return Unit((it /* :T */) => it)
}
