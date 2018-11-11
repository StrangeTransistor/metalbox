/* @flow */

import time from '../time'

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

		time:
		{
			start: time(),
			/* @flow-off */
			stop:  (null /* :$Hrtime */),
			/* @flow-off */
			taken: (null /* :$Hrtime */),
		}
	}

	return result
}


import { isStream as is_stream } from 'flyd'
import { stream as Stream } from 'flyd'
import { on } from 'flyd'

import stream_to from '../flyd/stream-to'
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

	var raw_stream = Stream()

	stream_to(raw_promise, raw_stream)

	/* @flow-off */
	var stream /* :flyd$Stream<$out> */ = Stream()

	on(raw =>
	{
		if (is_stream(raw))
		{
			// if (s_mode === 'true')

			raw = finalize(raw)

			turnoff(stream, raw)
			on(stream, raw)
		}
		else
		{
			stream(raw)
		}
	}
	, raw_stream)

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
