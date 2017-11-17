/* @flow */

export default async function runner (...args /*: string[] */)
{
	console.log(args)

	var f /* :Producer<void, string> */ = product

	console.log(await f())
}

async function product ()
{
	return 'product'
}
