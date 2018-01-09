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
			expect(buffer).deep.eq([ '1.ext', '2.ext', '3.ext' ])
		})
	})

	/*
	it('works inside composition', async () =>
	{
		var f1 = false
		var f2 = false

		var watch = Watch(globexpr, Unit(() => { f1 = true }))

		var unit = watch.pipe(Unit(() => { f2 = true }))

		var outcome = unit(Context(null))

		end(outcome)

		await outcome.output
		.then(() =>
		{
			expect(f1).true
			expect(f2).true
		})
	})
	*/
})
