/* @flow */

import clc from 'cli-color'

var error = clc.bold.red

export default function fatal (msg /* :string */)
{
	console.error(error(msg))
	process.exit(1)
}
