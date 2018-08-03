/* @flow */

var NL = '\n'

var now = () => +new Date

import ms from 'pretty-ms'

import clc from 'cli-color'
var { bold } = clc
var { green } = clc
var file = clc.blue.italic

import inspect from '../inspect'

import Unit from './Unit'

export default function Debug /* ::<$thru, $prov: $Providers$Base> */
(
	label /* ::?:string */
)
	/* :$Unit<$thru, $prov, $thru> */
{
	var init_ts = now()
	var prev_ts = init_ts

	return Unit(it =>
	{
		var ts = now()
		var timemark = mark(ts, prev_ts, init_ts)
		prev_ts = ts

		if (is_entry(it))
		{
			/* @flow-off */
			var entry = (it /* :$Entry<any> */)
			debug_entry(label, timemark, entry)
		}
		else
		{
			debug_any(label, timemark, it)
		}

		return it
	})
}

function mark (ts, prev_ts, init_ts)
{
	return `• ${ green(ms(ts - prev_ts)) } (${ green(ms(ts - init_ts)) })`
}

function is_entry (it)
{
	if (! it) { return false }
	if (typeof it !== 'object') { return false }
	if (typeof it.filename !== 'string') { return false }

	return ('content' in it)
}

function debug_entry (label, timemark, entry /* :$Entry<any> */)
{
	if (entry.content && entry.content.content)
	{
		write(...preplabel(label), timemark, ' ',
			bold('Entry<File>:'), ' ', entry.filename, NL
		)

		write(file(entry.content.content), NL)
		if (entry.content.sourcemap)
		{
			line()
			write(bold('sourcemap present:'), NL)
			write(file(entry.content.sourcemap), NL)
		}
	}
	else
	{
		write(...preplabel(label), timemark, ' ',
			bold('Entry<?>:'), ' ', entry.filename, NL
		)
		write(inspect(entry.content), NL)
	}
	line()
}

function debug_any (label, timemark, it)
{
	write(...preplabel(label), timemark, ' ', bold('Debug:'), NL)
	write(inspect(it), '\n')
}

function preplabel (label)
{
	if (label)
	{
		return [ green('#' + label), ' ' ]
	}

	return []
}


function line ()
{
	write('--- --- ---', NL)
}

function write (...args /* :string[] */)
{
	process.stdout.write(args.join(''))
}
