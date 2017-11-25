/* @flow */
/* :: import type { minimistOutput } from 'minimist' */

const nl = '\n'

import clc from 'cli-color'
var bold = clc.bold

import manifest from '../../package.json'

import runner from './runner'

var index = runner(
{
	help,
	version,
}
, describe)

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

function write (...args /* :string[] */)
{
	args.forEach(arg => process.stdout.write(arg))
}
