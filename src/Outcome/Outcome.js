/* @flow */

var time = (...v) => process.hrtime(...v)

import Promise from 'bluebird'
var reject = Promise.reject

import capture from './capture'

export default function Outcome /* ::<$out> */
(
	output /* :$Outcome$Value<$out> */
)
	/* :$Outcome<$out> */
{
	var [ promise, stream ] = capture(output)

	promise = promise.finally(() =>
	{
		outcome.time.taken = time(outcome.time.start)
		outcome.time.stop  = time()
	})

	var outcome =
	{
		stream,
		output: promise,

		time:
		{
			start: time(),
			/* @flow-off */
			stop:  (null /* :$Hrtime */),
			/* @flow-off */
			taken: (null /* :$Hrtime */),
		}
	}

	return outcome
}

Outcome.invoke = function invoke /* ::<$in, $prov: $Providers$Base, $out> */
(
	fn      /* :$Unit$Fn<$in, $prov, $out> */,
	context /* :$Context<$in, $prov> */
)
	/* :$Outcome<$out> */
{
	try
	{
		return Outcome(fn(context.input, context))
	}
	catch (e)
	{
		return Outcome(reject(e))
	}
}
