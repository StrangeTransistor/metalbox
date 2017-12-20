/* @flow */

import tmp from 'src/rootpath/tmp'
import origin from 'src/rootpath/origin'
import collate from 'src/rootpath/collate'

import compare from 'src/compare'

import Context from 'src/Context'

import Glob from 'src/Unit/Glob'
import Rollup from 'src/Unit/Rollup'
import { Cjs } from 'src/Unit/Rollup'

import deflow from 'rollup-plugin-flow'

import Rebase from 'src/Unit/Rebase'
import File from 'src/Unit/File'

describe('Es6', () =>
{
	var es6_org = origin('es6')
	var es6_cl  = collate('deflow')

	it('Rollup(flow)', async () =>
	{
		var tm = tmp()

		var plugins =
		[
			deflow({ pretty: true }),
		]

		var unit = Rollup.Entry(
		{
			external: true,
			plugins,
		})
		.pipe(Rebase(es6_org(), tm()))
		.pipe(Cjs())
		.pipe(File.Entry())

		var glob = Glob.Each(es6_org('**.js'), unit)

		await glob(Context(null))

		compare(es6_cl(), tm())
	})
})
