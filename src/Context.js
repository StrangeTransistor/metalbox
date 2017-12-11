/* @flow */

import Providers from './Providers'

export default function Context /* :: <$in, $prov: $Providers$Base> */
(
	input     /* :$in   */,
	/* @flow-off */
	providers /* :$prov */ = {}
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
	}

	return context
}
