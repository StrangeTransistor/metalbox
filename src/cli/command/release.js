/* @flow */
/* :: import type { minimistOutput } from 'minimist' */

import rootpath from '@streetstrider/rootpath'

import Context  from '../../Context'
import recipe_args from '../recipe-args'

import resolve from '../unit/resolve'
import make    from '../unit/make'
import invoke  from '../unit/invoke'

export default async function (mini /* :minimistOutput */)
{
	var recipe = resolve(mini)
	var unit   = await make(recipe, recipe_args(mini))

	/* @flow-off */
	var name = (mini['--'][0] || 'dev')

	var src = rootpath(process.cwd())
	var dst = src.partial('release', name)

	var context = Context(void 0, { src, dst })

	return await invoke(unit, context)
}
