/* @flow */
/* :: import type { minimistOutputStrict } from 'minimist' */

import Context from '../../Context'

import write  from '../write'
import { NL } from '../write'
import recipe_args from '../recipe-args'
import arg_eval from '../arg-eval'

import resolve from '../unit/resolve'
import make    from '../unit/make'
import invoke  from '../unit/invoke'

export default async function (mini /* :minimistOutputStrict */)
{
	if (! mini._.length)
	{
		write('metalbox u|unit <Unit|Recipe> [<...args>] -- [<input>]', NL)
		return
	}

	var recipe = resolve(mini._[0])
	var unit   = await make(recipe, recipe_args(mini))

	var input   = arg_eval(mini['--'][0])
	var context = Context(input)

	return await invoke(unit, context)
}
