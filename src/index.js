/* @flow */

import minimist from 'minimist'

export default async function runner (args /*: string[] */)
{
	console.log(args)
	var mini = minimist(args)
	console.log(mini)
}
