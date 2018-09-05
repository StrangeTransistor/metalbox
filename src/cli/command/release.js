/* @flow */
/* :: import type { minimistOutput } from 'minimist' */

import rootpath from '@streetstrider/rootpath'

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
	var name = (mini['--'][0] || 'dev')

	var src = rootpath(process.cwd())
	var dst = src.partial('release', name)

	var context = Context(null, { src, dst })

	return await invoke(unit, context)
}
