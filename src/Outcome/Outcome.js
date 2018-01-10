/* @flow */
// TODO timing

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

	var outcome =
	{
		stream,
		output: promise,
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
