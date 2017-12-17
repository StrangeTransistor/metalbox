/* @flow */

import { expect } from 'chai'

import origin from 'src/rootpath/origin'

import Context from 'src/Context'

import Unit from 'src/Unit'
import Glob from 'src/Unit/Glob'

describe('Glob', () =>
{
	var org = origin('glob')

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

			expect(filenames).deep.eq([ '1.ext', '2.ext', '3.ext' ])
		})
		/* eslint-enable max-nested-callbacks */

		var glob = Glob(org('*.ext'), unit)

		await glob(Context(null))
	})

	it('Glob.Each', async () =>
	{
		var unit = Unit(_ =>
		{
			expect(_).property('filename')
			expect(_).property('content')

			return org.relative(_.filename)
		})

		var glob = Glob.Each(org('*.ext'), unit)

		var outcome = await glob(Context(null))

		expect(outcome.output).deep.eq([ '1.ext', '2.ext', '3.ext' ])
	})
})
