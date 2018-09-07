/* @flow */
/* :: import type { minimistOutput } from 'minimist' */

import findroot from 'find-root'

import rootpath from '@streetstrider/rootpath'

import clc from 'cli-color'
// var bold    = clc.bold
// var green   = clc.green
var f_error = clc.bold.red

export default async function (mini /* :minimistOutput */)
{
	try
	{
		var cwd = process.cwd()
		var root_found = findroot(cwd)
		var root = rootpath(root_found)

		console.log('rootpath:', root())
	}
	catch (e)
	{
		console.error(f_error(`package.json not found anywhere from '${ cwd }'`))
	}
}
