/* @flow */

import Unit from './Unit'

export default async function runner (...args /*: string[] */)
{
	console.log(args)

	var unit = Unit(() => 17)

	var context =
	{
		input: null,
		first: true,
		once: false,
		live: false,

		engine: {},
		storage: {},
	}

	console.log(await unit(context))
}
