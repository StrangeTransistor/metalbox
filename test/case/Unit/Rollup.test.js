/* @flow */

import tmp from 'src/tmp'
import collate from 'src/collate'
import origin from 'src/origin'

import compare from 'src/compare'

import Context from 'src/Context'

import Rollup  from 'src/Unit/Rollup/Rollup'
import { Cjs } from 'src/Unit/Rollup/Rollup'
import Rebase  from 'src/Unit/Rebase'
import File    from 'src/Unit/File'

describe('Rollup', () =>
{
	it('Rollup(input)', async () =>
	{
		var tm  = tmp()
		var cl  = collate('rollup/cjs')
		var org = origin('rollup')

		var context = Context(null)

		var unit = Rollup(org('index.js'))
		.pipe(Cjs())
		.pipe(Rebase(org(), tm()))
		.pipe(File.Entry())

		await unit(context)

		compare(cl(), tm())
	})
})
