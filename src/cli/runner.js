/* @flow */
/* :: import type { minimistOutput } from 'minimist' */

import slice from './slice'

export default function runner
(
	variants        /* :{ [string]: Function } */,
	default_variant /* :Function */
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
