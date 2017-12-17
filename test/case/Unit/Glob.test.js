/* @flow */

import { expect } from 'chai'

import origin from 'src/rootpath/origin'

import Context from 'src/Context'

import Unit from 'src/Unit'
import Glob from 'src/Unit/Glob'

describe('Glob', () =>
{
	var org = origin('glob')

	it('works', async () =>
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
})
