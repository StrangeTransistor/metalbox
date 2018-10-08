/* @flow */
/* :: import type { minimistOutput } from 'minimist' */

import clc from 'cli-color'
var bold = clc.bold

import manifest from '../../package.json'

import runner from './runner'

import unit from './command/unit'
import release from './command/release'
import target from './command/target'

import write from './write'
import { NL } from './write'

export default runner(
{
	aliases:
	{
		'h': 'help',
		'?': 'help',
		'v': 'version',

		'u': 'unit',
		'r': 'release',
		't': 'target',
	},
	variants:
	{
		help,
		version,
		unit,
		release,
		target,
	},
	default_variant: describe,
	missing_variant: describe,
})

function help ()
{
	write('print help', NL)
}

function version ()
{
	write(manifest.version, NL)
}

function describe ()
{
	write(bold('metalbox'), ':', NL)
	write(`${ bold('version') } ${ manifest.version }`, NL)
	write('$ metalbox help', NL)
	write('$ metalbox version', NL)
}
