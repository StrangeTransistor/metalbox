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

export default function (mini /* :minimistOutput */)
{
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

	console.log(resolved.slice(0, 2))
	console.log(Unit)

	var unit = Unit(17)

	unit(Context('28'))
	.output
	.then(console.log, console.error)
}
