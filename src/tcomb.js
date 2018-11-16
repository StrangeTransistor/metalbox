/* @flow */

import tcomb from 'tcomb-validation'

tcomb.fail = (message) =>
{
	var error = new TypeError(message)

	error.name  = 'ValidationError'
	/* @flow-off OK */
	error.tcomb = true

	throw error
}

tcomb.Never = tcomb.irreducible('Never', () => false)

export default tcomb
