/* @flow */

import { expect } from 'chai'

import origin from 'src/rootpath/origin'

import Context from 'src/Context'

import Unit from 'src/Unit'
import Rebase from 'src/Unit/Rebase'
import Watch from 'src/Unit/Watch'

describe('Watch', () =>
{
	var org = origin('glob')

	var globexpr = org('*.ext')

	it('works', async () =>
	{
		var buffer = []

		var unit = Unit(({ filename }) =>
		{
			buffer.push(filename)
		})

		unit = Rebase(org(), '').pipe(unit)

		var watch = Watch(globexpr, unit)

		var outcome = watch(Context(null))

		setTimeout(() =>
		{
			/* @flow-off */
			outcome.stream.end(true)
		}
		, 200)

		await outcome.output
		.then(() =>
		{
			expect(buffer).deep.eq([ '1.ext', '2.ext', '3.ext' ])
		})
	})
})
