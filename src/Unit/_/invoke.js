/* @flow */

import Promise from 'bluebird'
var { reject } = Promise

import Outcome from '../../Outcome'

/* ::

declare function invoke <$in, $prov: $Providers$Base, $out>
(
	options: $Unit$Options<$in, $prov, $out>,
	context: $Context<$in, $prov>
)
: $Outcome<$out>

*/

export default function invoke (options, context)
{
	var unit = options.unit
	var val_input = options.input

	try
	{
		var input = context.input
		// providers = context.providers

		val_input(input)
		// TODO: validate providers(context.providers) as well
		// val_providers(providers)

		return Outcome(unit(input, context))
	}
	catch (e)
	{
		return Outcome(reject(e))
	}
}
