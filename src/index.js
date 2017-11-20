/* @flow */

// import Unit from './Unit'
import File from './Unit/File'

export default async function runner (...args /*: string[] */)
{
	console.log(args)

	var unit = File('/tmp/abc', 'ABC')

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
