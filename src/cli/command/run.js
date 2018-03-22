/* @flow */
/* :: import type { minimistOutput } from 'minimist' */

import compose from '../resolver/compose'
import cwd  from '../resolver/cwd'
import base from '../resolver/base'

var basic_resolver = compose(
[
	cwd(),
	base(__dirname + '/../..'),    /* metalbox/src/ */
	base(__dirname + '/../../..'), /* metalbox/     */
])

export default function (mini /* :minimistOutput */)
{
	var name = String(mini._[0] || '')

	console.log(basic_resolver(name))
}
