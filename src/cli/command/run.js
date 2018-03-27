/* @flow */
/* :: import type { minimistOutput } from 'minimist' */

import compose from '../resolver/compose'
import cwd  from '../resolver/cwd'
import base from '../resolver/base'

import { Nothing } from '../resolver/resolver'

var basic_resolver = compose(
[
	cwd(),
	base(__dirname + '/../..'),    /* metalbox/src/ */
	base(__dirname + '/../../..'), /* metalbox/     */
])

export default function (mini /* :minimistOutput */)
{
	var name = String(mini._[0] || '')

	var resolved = basic_resolver(name)

	if (resolved !== Nothing)
	{
		/* @flow-off */
		var tuple /* :[string, string, any] */ = resolved

		console.log(tuple.slice(0, 2))
		console.log(tuple[2].default)
	}
	else
	{
		console.log(resolved)
	}
}
