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
		var timemark = `• ${ green(ms(ts - prev_ts)) } (${ green(ms(ts - init_ts)) })`
		prev_ts = ts

		if (it && it.filename && ('content' in it))
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
			hr()
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
	hr()
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


function hr ()
{
	write('--- --- ---', NL)
}

function write (...args /* :string[] */)
{
	process.stdout.write(args.join(''))
}
