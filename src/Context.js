/* @flow */

import Providers from './Providers'

export default function Context /* :: <$in, $prov: $Providers$Base> */
(
	input     /* :$in */,
	/* @flow-off */
	providers /* :$prov */ = ({} /* :$Providers$Base */)
)
	/* :$Context<$in, $prov> */
{
	var context =
	{
		input,

		once: false,
		live: false,

		engine: {},
		providers: Providers(providers),

		derive: function /* ::<$d_in, $prov_add: $Providers$Base> */
		(
			input     /* :$d_in */,
			/* @flow-off */
			providers /* :$prov_add */ = ({} /* :$Providers$Base */)
		)
			/* :$Context<$d_in, $prov & $prov_add> */
		{
			var derived = Context(input)

			derived.once  = context.once
			derived.live  = context.live

			derived.engine = context.engine

			if (providers)
			{
				derived.providers = context.providers.derive(providers)
				return (derived /* :$Context<$d_in, $prov & $prov_add> */)
			}
			else
			{
				/* @flow-off */
				derived.providers = context.providers.derive({})
				return (derived /* :$Context<$d_in, $prov & $prov_add> */)
			}
		}
	}

	return context
}
