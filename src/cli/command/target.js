/* @flow */
/* :: import type { minimistOutput } from 'minimist' */

import findroot from 'find-root'
import rootpath from '@streetstrider/rootpath'
import tildify from 'tildify'

import clc from 'cli-color'
var bold    = clc.bold

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

	var pkg_metalbox = pkg.metalbox
	var name = (mini._[0] || pkg.name || 'dev')

	if (! (name in Object(pkg_metalbox)))
	{
		fatal(`Target '${ name }' not found in 'package.metalbox'`)
	}

	var target = pkg_metalbox[name]

	console.log('target', target)
}

