/* @flow */

import tmp from 'src/rootpath/tmp'
import origin from 'src/rootpath/origin'
import collate from 'src/rootpath/collate'

import compare from 'src/compare'

import Context from 'src/Context'

import Glob from 'src/Unit/Glob'
import Watch from 'src/Unit/Watch'

import Rollup from 'src/Unit/Rollup'
import { Cjs } from 'src/Unit/Rollup'

import Rebase from 'src/Unit/Rebase'
import File from 'src/Unit/File'

import deflow from 'src/metal/deflow'
import Outlander from 'src/metal/Outlander'
import Emptish from 'src/metal/Emptish'
import Iop from 'src/metal/Iop'

describe('Es6', () =>
{
	var es6_org = origin('es6')
	var es6_cl  = collate('deflow')

	function R (src, dst)
	{
		var plugins =
		[
			deflow(),
		]

		return Rollup.Entry(
		{
			external: true,
			plugins,
		})
		.pipe(Rebase(src(), dst()))
		.pipe(Cjs())
		.pipe(Outlander())
		.pipe(Emptish())
		.pipe(Iop())
		.pipe(File.Entry())
	}

	it('Rollup(flow)', async () =>
	{
		var tm = tmp()

		var glob = Glob.Each(es6_org('**/*.js'), R(es6_org, tm))

		await glob(Context(null)).output

		compare(es6_cl(), tm())
	})

	it('Rollup(flow) Watch', async () =>
	{
		var tm = tmp()

		var watch = Watch(es6_org('**/*.js'), R(es6_org, tm))

		var outcome = watch(Context(null))

		setTimeout(() =>
		{
			/* @flow-off */
			outcome.stream.end(true)
		}
		, 200)

		await outcome.output

		compare(es6_cl(), tm())
	})
})
