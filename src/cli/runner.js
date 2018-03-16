/* @flow */
/* :: import type { minimistOutput } from 'minimist' */
/* ::

export type Options =
{
	variants:{ [string]: Function },
	default_variant: Function,
}

*/

import slice from './slice'

export default function runner
(
{
	variants,
	default_variant,
}
/* :Options */
)
{
	return (mini /* :minimistOutput */) =>
	{
		if (mini._.length)
		{
			var cmd = mini._[0]

			if (cmd in variants)
			{
				return variants[cmd](slice(mini))
			}
			else
			{
				return default_variant(mini)
			}
		}
		else
		{
			return default_variant(mini)
		}
	}
}
