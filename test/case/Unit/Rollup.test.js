/* @flow */

// import bluebird from 'bluebird'
// var delay = bluebird.delay

// import tmp from 'src/tmp'
// import collate from 'src/collate'
// import compare from 'src/compare'
import origin from 'src/origin'

import Context from 'src/Context'
import Rollup from 'src/Unit/Rollup/Rollup'

describe.only('Rollup', () =>
{
	it('Rollup(input)', async () =>
	{
		var org = origin('rollup')
		var context = Context(null)

		var unit = Rollup(org('index.js'))

		await unit(context)
	})
})
