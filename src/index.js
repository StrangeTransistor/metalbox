/* @flow */

export default async function runner (...args /*: string[] */)
{
	console.log(args)
	console.log(await product())
}

async function product ()
{
	return 'product'
}
