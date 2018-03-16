/* @flow */
/* :: import type { minimistOutput } from 'minimist' */
/* ::

export type Options =
{
	aliases: { [string]: string },
	variants:{ [string]: Function },
	default_variant: Function,
}

*/

import slice from './slice'

export default function runner
(
{
	aliases,
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

			cmd = aliases[cmd] || cmd

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
