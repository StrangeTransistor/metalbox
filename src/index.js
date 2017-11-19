/* @flow */

import Unit from './Unit'

export default async function runner (...args /*: string[] */)
{
	console.log(args)

	var f /* :$Producer<[ number ], string> */ = product

	console.log(await f(17))

	var u = Unit()

	console.log(u()())
}

async function product ()
{
	return 'product'
}
