/* @flow */
/* :: import type { minimistOutput } from 'minimist' */
/* :: import type { minimistOptions } from 'minimist' */
/* ::

export type Options =
{
	aliases: { [string]: string },
	variants:{ [string]: Function },
	default_variant: Function,
	missing_variant: Function,
	minimist_opts?: minimistOptions,
}

*/

var noop = () => {}
var assign = Object.assign

import minimist from 'minimist'

import slice from './slice'

export default function runner
(
{
	aliases = {},
	variants = {},
	default_variant = noop,
	missing_variant = noop,
	minimist_opts,
}
/* :Options */
)
{
	// TODO: support async variants

	minimist_opts = assign({}, minimist_opts, { 'stopEarly': true, '--': true, })

	return (args /* :string[] */) =>
	{
		var mini /* :minimistOutput */ = minimist(args, minimist_opts)

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
				return missing_variant(mini)
			}
		}
		else
		{
			return default_variant(mini)
		}
	}
}
