/* @flow */

import bluebird from 'bluebird'
var delay = bluebird.delay

import { expect } from 'chai'

import origin from 'src/rootpath/origin'

import Context from 'src/Context'

import Unit from 'src/Unit'
import Glob from 'src/Unit/Glob'

describe('Glob', () =>
{
	var org = origin('glob')

	var globexpr = org('*.ext')
	var expected = [ '1.ext', '2.ext', '3.ext' ]

	it('Glob', async () =>
	{
		/* eslint-disable max-nested-callbacks */
		var unit = Unit(_ =>
		{
			expect(_).an('array')
			expect(_.length).eq(3)

			expect(_[0]).property('filename')
			expect(_[0]).property('content')

			var filenames = _.map(it => it.filename)

			filenames = filenames.map(it => org.relative(it))

			filenames = filenames.slice().sort()

			expect(filenames).deep.eq(expected)
		})
		/* eslint-enable max-nested-callbacks */

		var glob = Glob(globexpr, unit)

		await glob(Context(null)).output
	})

	it('Glob.Each', async () =>
	{
		var unit = Unit(_ =>
		{
			expect(_).property('filename')
			expect(_).property('content')

			return org.relative(_.filename)
		})

		var glob = Glob.Each(globexpr, unit)

		var output = await glob(Context(null)).output

		expect(output).eq('3.ext')
	})

	it('Glob.Each async', async () =>
	{
		var unit = Unit(_ =>
		{
			return delay(100, org.relative(_.filename))
		})

		var glob = Glob.Each(globexpr, unit)

		var output = await glob(Context(null)).output

		expect(output).eq('3.ext')
	})

	it('Glob.Each streaming', async () =>
	{
		var b1 = []
		var b2 = []

		var glob = Glob.Each(globexpr, Unit(input =>
		{
			return b1.push(org.relative(input.filename))
		}))

		var unit = glob.pipe(Unit(input =>
		{
			return (b2.push(input), input)
		}))

		var outcome = unit(Context(null))

		var output = await outcome.output

		expect(output).eq(3)
		expect(b1.sort()).deep.eq(expected)
		expect(b2.sort()).deep.eq([ 1, 2, 3 ].sort())
	})
})
