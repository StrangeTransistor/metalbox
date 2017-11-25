/* @flow */

import minimist from 'minimist'
import runner   from './cli'

export default async function (args /*: string[] */)
{
	return runner(minimist(args))
}
