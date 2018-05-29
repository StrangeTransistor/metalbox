/* @flow */
/* :: import type { minimistOutput } from 'minimist' */

import compose from '../resolver/compose'
import cwd  from '../resolver/cwd'
import base from '../resolver/base'

import { Nothing } from '../resolver/resolver'

import Context from '../../Context'

var basic_resolver = compose(
[
	cwd(),
	base(__dirname + '/../../Unit'), /* metalbox/src/Unit/ */
	base(__dirname + '/../..'),      /* metalbox/src/ */
	base(__dirname + '/../../..'),   /* metalbox/     */
])

export default async function (mini /* :minimistOutput */)
{
	console.log('mini', mini)

	// TODO: attach runner here if required (to parse opts in corresponding section of cli)
	var name = String(mini._[0] || '')

	var resolved = basic_resolver(name)

	if (resolved === Nothing)
	{
		console.log(resolved)
		return
	}

	/* @flow-off */
	/* :: resolved = (resolved :[string, string, any]) */

	var Unit = resolved[2].default

	var unit_make_args = mini._.slice(1)

	try
	{
		var unit = Unit(...unit_make_args)
	}
	catch (e)
	{
		console.log('catch static:')
		console.log(e)
		return
	}

	var unit_input = mini['--'][0]

	try
	{
		var outcome = unit(Context(unit_input))

		var output = await outcome.output
	}
	catch (e)
	{
		console.log('catch:')
		console.log(e)
		return
	}

	console.log('OK')
	console.log(output)
}
