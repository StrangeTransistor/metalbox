/* @flow */

import bluebird from 'bluebird'
var delay = bluebird.delay

import { expect } from 'chai'

import origin from 'src/rootpath/origin'

import { concat } from 'src/flyd/drain'

import Context from 'src/Context'

import Unit from 'src/Unit'
import GlobTo from 'src/Unit/Glob/GlobTo'
import Glob from 'src/Unit/Glob'

describe('Glob', () =>
{
	var org = origin('glob')

	var globexpr = org('*.ext')
	var expected = [ '1.ext', '2.ext', '3.ext' ]

	it('GlobTo', async () =>
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

		var glob = GlobTo(globexpr, unit)

		await glob(Context(null)).output
	})

	it('GlobTo streaming', async () =>
	{
		var b1 = []
		var b2 = []

		var glob = GlobTo(globexpr, Unit(input =>
		{
			// eslint-disable-next-line
			var $input = input.map(entry => org.relative(entry.filename))

			return (b1.push($input), $input)
		}))

		var unit = glob.pipe(Unit(input =>
		{
			return (b2.push(input), input)
		}))

		var outcome = unit(Context(null))

		var output = await outcome.output

		expect(output.sort()).deep.eq(expected)

		expect(b1.length).eq(1)
		expect(b2.length).eq(1)

		expect(b1[0].sort()).deep.eq(expected)
		expect(b2[0].sort()).deep.eq(expected)
	})

	it('Glob', async () =>
	{
		var unit = Unit(_ =>
		{
			expect(_).property('filename')
			expect(_).property('content')

			return org.relative(_.filename)
		})

		var glob = Glob(globexpr, unit)

		var output = await glob(Context(null)).output

		expect(output).eq('3.ext')
	})

	it('Glob (no unit)', async () =>
	{
		var unit = Unit(_ =>
		{
			expect(_).property('filename')
			expect(_).property('content')

			return org.relative(_.filename)
		})

		var glob = Glob(globexpr)
		.pipe(unit)

		var output = await glob(Context(null)).output

		expect(output).eq('3.ext')
	})

	it('Glob async', async () =>
	{
		var unit = Unit(_ =>
		{
			return delay(25, org.relative(_.filename))
		})

		var glob = Glob(globexpr, unit)

		var output = await glob(Context(null)).output

		expect(output).eq('3.ext')
	})

	it('Glob streaming', async () =>
	{
		var b1 = []
		var b2 = []

		var glob = Glob(globexpr, Unit(input =>
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

	it('Glob streaming Error', async () =>
	{
		var error = new Error('e')

		var b1 = []
		var b2 = []

		var glob = Glob(globexpr, Unit(async (input) =>
		{
			await delay(25)

			return b1.push(org.relative(input.filename))
		}))

		var unit = glob.pipe(Unit(input =>
		{
			if (input === 2)
			{
				throw error
			}

			return (b2.push(input), input)
		}))

		var outcome = unit(Context(null))

		/* @flow-off */
		var buffer = concat(outcome.stream)
		var r = outcome.output.then(
		()  => expect(false).true,
		(e) => e)

		expect(await r).eq(error)
		expect(await buffer).deep.eq([ 1, error ])

		expect(b1.sort()).deep.eq([ '1.ext', '2.ext' ])
		expect(b2.sort()).deep.eq([ 1 ])
	})
})
