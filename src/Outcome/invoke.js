/* @flow */

import Promise from 'bluebird'
var reject = Promise.reject

import Outcome from './Outcome'

export default function invoke /* ::<$in, $prov: $Providers$Base, $out> */
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
