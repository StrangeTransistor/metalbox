/* @flow */
/* :: import type { minimistOutputStrict } from 'minimist' */

import arg_eval from './arg-eval'

export default function (mini /* :minimistOutputStrict */)
{
	return mini._
	.slice(1)
	.map(arg_eval)
}
