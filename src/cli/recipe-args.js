/* @flow */
/* :: import type { minimistOutput } from 'minimist' */

import arg_eval from './arg-eval'

export default function (mini /* :minimistOutput */)
{
	return mini._
	.slice(1)
	.map(arg_eval)
}
