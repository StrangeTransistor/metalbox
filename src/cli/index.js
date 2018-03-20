/* @flow */
/* :: import type { minimistOutput } from 'minimist' */

const nl = '\n'

import clc from 'cli-color'
var bold = clc.bold

import manifest from '../../package.json'

import runner from './runner'
import re_solve from './resolve'

import run from './command/run'

var index = runner(
{
	aliases:
	{
		'h': 'help',
		'?': 'help',
		'v': 'version',

		'r': 'run',
	},
	variants:
	{
		help,
		version,
		resolve,
		run,
	},
	default_variant: describe,
	missing_variant: describe,
})

export default function (mini /* :minimistOutput */)
{
	return index(mini)
}

function help ()
{
	write('print help', nl)
}

function version ()
{
	write(manifest.version, nl)
}

function describe ()
{
	write(bold('metalbox'), ':', nl)
	write(`${ bold('version') } ${ manifest.version }`, nl)
	write('$ metalbox help', nl)
	write('$ metalbox version', nl)
}

function resolve (mini /* :minimistOutput */)
{
	var name = mini._[0] || ''

	re_solve(String(name))
}

function write (...args /* :string[] */)
{
	args.forEach(arg => process.stdout.write(arg))
}
