/* @flow */
/* :: import type { minimistOutput } from 'minimist' */

import findroot from 'find-root'
import rootpath from '@streetstrider/rootpath'
import tildify from 'tildify'

import clc from 'cli-color'
var bold = clc.bold

import Context  from '../../Context'

import arg_eval from '../arg-eval'

import resolve from '../unit/resolve'
import make    from '../unit/make'
import invoke  from '../unit/invoke'

import fatal from '../fatal'

export default async function (mini /* :minimistOutput */)
{
	var cwd = process.cwd()

	try
	{
		var root_found = findroot(cwd)
	}
	catch (e)
	{
		fatal(`package.json not found anywhere from '${ cwd }'`)
	}

	var root_found_tilde = tildify(root_found)
	/* @flow-off */
	var root = rootpath(root_found)

	console.info(`${ bold('Resolved package') }: ${ root_found_tilde }`)

	/* @flow-off */
	var pkg = require(root('package.json'))

	var name = (mini._[0] || pkg.name || 'dev')

	var [ recipe_name, recipe_arg ] = decide_target(name, pkg)

	var recipe = resolve(recipe_name)
	var unit   = await make(recipe, [ recipe_arg ])

	/* @flow-off */
	var unit_arg = arg_eval(mini['--'][0])

	var src = root
	var dst = src.partial('release', name)

	var context = Context(unit_arg, { src, dst })

	return await invoke(unit, context)
}


function decide_target (
	name /* :string */,
	pkg  /* :Object */
)
{
	name || (name = pkg.name || 'dev')

	var pkg_metalbox = pkg.metalbox

	if (! (name in Object(pkg_metalbox)))
	{
		fatal(`Target '${ name }' not found in 'package.metalbox'`)
	}

	var target = pkg_metalbox[name]

	if (! is_tuple(target))
	{
		fatal(
			'Target must be a tuple' +
			' [ path to recipe, ?recipe arg, ?engine options ]'
		)
	}

	var [ recipe_name, recipe_arg, engine_options ] = target
	console.log(recipe_name, recipe_arg, engine_options)

	return [ recipe_name, recipe_arg, engine_options ]
}

function is_tuple (target)
{
	if (! Array.isArray(target)) { return false }
	if (target.length < 1) { return false }
	if (target.length > 3) { return false }

	return true
}
