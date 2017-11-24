/* @flow */

import minimist from 'minimist'
import runner   from './cli'

export default async function (args /*: string[] */)
{
	console.log(args)
	var mini = minimist(args)
	console.log(mini)

	return runner(mini)
}
