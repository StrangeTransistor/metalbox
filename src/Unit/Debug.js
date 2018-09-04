/* @flow */

var NL = '\n'

import time from '../time'

import hr from 'pretty-hrtime'

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
	var init_ts = time()
	var prev_ts = init_ts

	return Unit((it, context) =>
	{
		var timemark
		[ prev_ts, timemark ] = mark(prev_ts, init_ts)

		if (is_entry(it))
		{
			/* @flow-off */
			var entry = (it /* :$Entry<any> */)
			debug_entry(label, timemark, entry, context.providers)
		}
		else
		{
			debug_any(label, timemark, it, context.providers)
		}

		return it
	})
}

function mark (prev_ts, init_ts)
{
	var delta_prev = time(prev_ts)
	var delta_init = time(init_ts)
	var ts         = time()

	var msg = `• ${ green(hr(delta_prev)) } (${ green(hr(delta_init)) })`

	return [ ts, msg ]
}

function is_entry (it)
{
	if (! it) { return false }
	if (typeof it !== 'object') { return false }
	if (typeof it.filename !== 'string') { return false }

	return ('content' in it)
}

function debug_entry (
	label,
	timemark,
	entry /* :$Entry<any> */,
	providers /* :$Providers<any> */
)
{
	if (entry.content && entry.content.content)
	{
		write(...preplabel(label), timemark, ' ',
			bold('Entry<File>'), ': ', entry.filename, NL
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
	debug_providers(providers)
}

function debug_any (label, timemark, it, providers)
{
	write(...preplabel(label), timemark, ':', NL)
	write(inspect(it), NL)
	debug_providers(providers)
}

function debug_providers (providers /* :$Providers<any> */)
{
	if (! providers.is_empty())
	{
		write(bold('Providers'), ': ', inspect(providers), NL)
	}
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
