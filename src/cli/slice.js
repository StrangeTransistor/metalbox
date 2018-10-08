/* @flow */
/* :: import type { minimistOutputStrict } from 'minimist' */

import clone from 'lodash/clone'

export default function slice (mini /* :minimistOutputStrict */)
{
	mini = clone(mini)

	mini._ = mini._.slice(1)

	return mini
}
