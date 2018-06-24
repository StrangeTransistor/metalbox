/* @flow */

var NL = '\n'

import { inspect } from 'util'

import clc from 'cli-color'
var { bold } = clc
var { green } = clc
var file = clc.blue.italic

import Unit from './Unit'

var defaults =
{
	colors: true,
	depth: 2,
}

export default function Debug /* ::<$thru, $prov: $Providers$Base> */
(
	label /* ::?:string */
)
	/* :$Unit<$thru, $prov, $thru> */
{
	return Unit(it =>
	{
		if (it && it.filename && it.content)
		{
			/* @flow-off */
			var entry = (it /* :$Entry<any> */)
			debug_entry(label, entry)
		}
		else
		{
			debug_any(label, it)
		}

		return it
	})
}


function debug_entry (label, entry /* :$Entry<any> */)
{
	if (entry.content && entry.content.content)
	{
		write(...preplabel(label), bold('Entry<File>:'), ' ', entry.filename, NL)
		write(file(entry.content.content), NL)
		if (entry.content.sourcemap)
		{
			hr()
			write(bold('sourcemap present:'), NL)
			write(file(entry.content.sourcemap), NL)
		}
	}
	else
	{
		write(...preplabel(label), bold('Entry<?>:'), ' ', entry.filename, NL)
		write(inspect(entry.content, defaults), NL)
	}
	hr()
}

function debug_any (label, it)
{
	write(...preplabel(label), bold('Debug:'), NL)
	write(inspect(it, defaults), '\n')
}

function preplabel (label)
{
	if (label)
	{
		return [ green('#' + label), ' ' ]
	}

	return []
}


function hr ()
{
	write('--- --- ---', NL)
}

function write (...args /* :string[] */)
{
	process.stdout.write(args.join(''))
}
