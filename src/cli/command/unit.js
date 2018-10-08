/* @flow */
/* :: import type { minimistOutput } from 'minimist' */

import Context from '../../Context'

import write  from '../write'
import { NL } from '../write'
import recipe_args from '../recipe-args'
import arg_eval from '../arg-eval'

import resolve from '../unit/resolve'
import make    from '../unit/make'
import invoke  from '../unit/invoke'

export default async function (mini /* :minimistOutput */)
{
	if (! mini._.length)
	{
		write('metalbox u|unit <Unit|Recipe> [<...args>] -- [<input>]', NL)
		return
	}

	var recipe = resolve(mini._[0])
	var unit   = await make(recipe, recipe_args(mini))

	/* @flow-off */
	var input   = arg_eval(mini['--'][0])
	var context = Context(input)

	return await invoke(unit, context)
}
