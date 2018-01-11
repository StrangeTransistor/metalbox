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
	var expected = [ '1.ext', '2.ext', '3.ext' ].sort()

	function end (outcome /* :$Outcome<*> */)
	{
		setTimeout(() =>
		{
			/* @flow-off */
			outcome.stream.end(true)
		}
		, 200)
	}

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

		end(outcome)

		await outcome.output
		.then(() =>
		{
			expect(buffer.sort()).deep.eq(expected)
		})
	})

	it('works inside composition', async () =>
	{
		var b1 = []
		var b2 = []

		var watch = Watch(globexpr, Unit(input =>
		{
			return b1.push(org.relative(input.filename))
		}))

		var unit = watch.pipe(Unit(input =>
		{
			return b2.push(input)
		}))

		var outcome = unit(Context(null))

		end(outcome)

		await outcome.output
		.then(() =>
		{
			expect(b1.sort()).deep.eq(expected)
			expect(b2.sort()).deep.eq([ 1, 2, 3 ].sort())
		})
	})
})
