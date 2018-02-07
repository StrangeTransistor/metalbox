/* @flow */

import sqr from './dir/mod'
import mod2 from './re-mod2'

function so () { return 1 - 1 }

so() && mod2()

export default function cube (v: number)
{
	return sqr(v) * v
}
