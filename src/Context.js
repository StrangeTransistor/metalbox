/* @flow */

import Providers from './Providers'

/* ::

declare function Context<$in, $prov: $Providers$Base> ($in, $prov)
: $Context<$in, $prov>

declare function Context<$in> ($in): $Context<$in, {||}>

*/

export default function Context (input, providers)
{
	var context =
	{
		input,

		once: false,
		live: false,

		engine: {},
		providers: Providers(providers),

		derive (input, providers)
		{
			var derived = Context(input)

			derived.once  = context.once
			derived.live  = context.live

			derived.engine = context.engine

			derived.providers = context.providers.derive(providers)

			return derived
		},
	}

	return context
}
