/* @flow */

import minimist from 'minimist'
import runner   from './cli'

var options =
{
	'--': true,
}

export default async function (args /*: string[] */)
{
	return runner(minimist(args, options))
}
