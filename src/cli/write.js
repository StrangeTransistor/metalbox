/* @flow */

export default function write (...args /* :string[] */)
{
	args.forEach(arg => process.stdout.write(arg))
}

export const NL = '\n'
