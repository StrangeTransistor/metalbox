/* @flow */

import clc from 'cli-color'
import { compareSync as compare } from 'dir-compare'

var bold = clc.bold

export default function (dst /* :string */, tmp /* :string */)
{
	var r = compare(dst, tmp,
	{
		compareSize: true,
		compareContent: true,
		excludeFilter: 'release.json'
	})

	if (r.same)
	{
		console.log(` ${bold('tmp:')} ${tmp}`)
	}
	else
	{
		var differences = r.differences
		var diff = r.diffSet.filter(it => it.state !== 'equal')

		console.warn('release differs: %s files differences', differences)
		console.warn(diff)
		console.log(bold(` meld ${tmp} ${dst}`))

		throw new Error('release differs')
	}
}
