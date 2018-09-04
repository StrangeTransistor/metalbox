/* @flow */
/* :: import type { minimistOutput } from 'minimist' */

import Context  from '../../Context'
import arg_eval from '../arg-eval'

import resolve from '../unit/resolve'
import make    from '../unit/make'
import invoke  from '../unit/invoke'

export default async function (mini /* :minimistOutput */)
{
	var recipe = resolve(mini)

	var recipe_args = mini._
	.slice(1)
	.map(arg_eval)

	var unit = await make(recipe, recipe_args)

	/* @flow-off */
	var unit_input = mini['--'][0]
	unit_input = arg_eval(unit_input)
	var context = Context(unit_input)

	// rootpath src, dst

	return await invoke(unit, context)
}
