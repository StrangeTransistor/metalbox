/* @flow */

import Providers from './Providers'

export default function Context /* :: <$in, $prov: $Providers$Base> */
(
	input     /* :$in   */,
	/* @flow-off */
	providers /* :$prov */ = /* :: (*/ {} /* :$Providers$Base ) */
)
	/* :$Context<$in, $prov> */
{
	var context =
	{
		input,

		first: true,
		once: false,
		live: false,

		engine: {},
		providers: Providers(providers),

		// TODO: providers derive
		derive: function /* ::<$d_in> */ (input /* :$d_in */)
			/* :$Context<$d_in, $prov> */
		{
			var derived = Context(input)

			derived.first = context.first
			derived.once  = context.once
			derived.live  = context.live

			derived.engine = context.engine

			derived.providers = context.providers

			return /* :: ( */ derived /* :$Context<$d_in, $prov> ) */
		}
	}

	return context
}
