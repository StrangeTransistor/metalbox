/* @flow */
/* :: import type { minimistOutput } from 'minimist' */

import Context  from '../../Context'
import arg_eval from '../arg-eval'
import recipe_args from '../recipe-args'

import resolve from '../unit/resolve'
import make    from '../unit/make'
import invoke  from '../unit/invoke'

export default async function (mini /* :minimistOutput */)
{
	var recipe = resolve(mini._[0])
	var unit   = await make(recipe, recipe_args(mini))

	/* @flow-off */
	var unit_input = mini['--'][0]
	unit_input = arg_eval(unit_input)
	var context = Context(unit_input)

	return await invoke(unit, context)
}
