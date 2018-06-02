/* @flow */

import tcomb from 'tcomb'

tcomb.fail = (message) =>
{
	var error = new TypeError(message)

	error.name  = 'ValidationError'
	/* @flow-off */
	error.tcomb = true

	throw error
}

export default tcomb
