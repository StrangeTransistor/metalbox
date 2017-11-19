/* @flow */

import Unit from './Unit'

export default async function runner (...args /*: string[] */)
{
	console.log(args)

	var f /* :Producer<void, string> */ = product

	console.log(await f())

	var u = Unit()

	console.log(u()())
}

async function product ()
{
	return 'product'
}
