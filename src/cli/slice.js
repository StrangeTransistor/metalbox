/* @flow */
/* :: import type { minimistOutput } from 'minimist' */

import clone from 'lodash/clone'

export default function slice (mini /* :minimistOutput */)
{
	mini = clone(mini)

	mini._ = mini._.slice(1)

	return mini
}
