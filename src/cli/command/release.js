/* @flow */
/* :: import type { minimistOutputStrict } from 'minimist' */

import { basename } from 'path'

import rootpath from '@streetstrider/rootpath'

import Context  from '../../Context'

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
		write(
			'metalbox r|release <Unit|Recipe>',
			' [<...args>] -- [<release dir> = cwd] [<input>]',
			NL
		)
		return
	}

	var recipe = resolve(mini._[0])
	var unit   = await make(recipe, recipe_args(mini))

	var cwd  = process.cwd()
	var name = (mini['--'][0] || basename(cwd))

	var src = rootpath(cwd)
	var dst = src.partial('release', name)

	var input   = arg_eval(mini['--'][1])
	var context = Context(input, { src, dst })

	return await invoke(unit, context)
}
