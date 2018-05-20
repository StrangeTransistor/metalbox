/* @flow */

import Promise from 'bluebird'
var { reject } = Promise

import Outcome from '../../Outcome'

/* ::

declare function invoke <$in, $prov: $Providers$Base, $out>
(
	fn: $Unit$Fn<$in, $prov, $out>,
	context: $Context<$in, $prov>,
	input: Function
)
: $Outcome<$out>

*/

export default function invoke (fn, context, input)
{
	try
	{
		input(context.input)
		// TODO: validate providers(context.providers) as well

		return Outcome(fn(context.input, context))
	}
	catch (e)
	{
		return Outcome(reject(e))
	}
}
