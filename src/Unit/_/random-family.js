/* @flow */

import { generate as random } from 'randomstring'
import pad from 'lodash/padStart'

var opts =
{
	length: 3,
	capitalization: 'uppercase',
}

/* STATE GLOBAL */
var n = 1

export default function ()
{
	return `${ pad(String(n++), 3, '0') }.${ random(opts) }`
}
