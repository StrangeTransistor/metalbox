/* @flow */

import time from '../time'

import as_alive from './alive'

export default function Result /* ::<$in, $prov: $Providers$Base, $out> */
(
	unit    /* :$Unit$Fn<$in, $prov, $out> */,
	context /* :$Context<$in, $prov> */,
	options /* :{ input: Function } */
)
	/* :$Result<$out> */
{
	var out = invoke(unit, context, options)

	var { promise } = out
	var { stream }  = out

	promise = promise.finally(() =>
	{
		result.time.taken = time(result.time.start)
		result.time.stop  = time()
	})

	var result =
	{
		promise,
		stream,

		alive,

		time:
		{
			start: time(),
			/* @flow-off */
			stop:  (null /* :$Hrtime */),
			/* @flow-off */
			taken: (null /* :$Hrtime */),
		},
	}

	function alive ()
	{
		return as_alive(result)
	}

	return result
}


import { isStream as is_stream } from 'flyd'
import { stream as Stream } from 'flyd'

import onto from '../flyd/onto'
import turnoff from '../flyd/turnoff'
import finalize from '../flyd/finalize'
import { either as drain } from '../flyd/drain'

function invoke /* ::<$in, $prov: $Providers$Base, $out> */
(
	unit    /* :$Unit$Fn<$in, $prov, $out> */,
	context /* :$Context<$in, $prov> */,
	options /* :{ input: Function } */
)
	/* : $Result$Raw<$out> */
{
	var raw_promise = capture(unit, context, options)

	raw_promise.catch(error =>
	{
		if (! (error instanceof Error)) { error = Error(error) }

		return error
	})
	.then(value =>
	{
		if (! is_stream(value))
		{
			raw_stream(value)
			raw_stream.end(true)
			return
		}

		onto(value, raw_stream)
		turnoff(value, raw_stream)
		turnoff(raw_stream, value)
	})

	/* @flow-off */
	var raw_stream /* :flyd$Stream<$out> */ = Stream()

	var stream  = finalize(raw_stream)
	var promise = drain(stream)

	return { promise, stream }
}


import Promise from 'bluebird'
var { resolve } = Promise
var { reject } = Promise

function capture /* ::<$in, $prov: $Providers$Base, $out> */
(
	unit    /* :$Unit$Fn<$in, $prov, $out> */,
	context /* :$Context<$in, $prov> */,
	options /* :{ input: Function } */
)
	/* :Promise<$out> */
{
	try
	{
		var { input } = context
		var val_input = options.input

		val_input(input)

		var raw = unit(input, context)

		return resolve(raw)
	}
	catch (e)
	{
		return reject(e)
	}
}
