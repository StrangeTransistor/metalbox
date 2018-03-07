/* @flow */

import tmp from 'src/rootpath/tmp'
import origin from 'src/rootpath/origin'
import collate from 'src/rootpath/collate'

import compare from 'src/compare'

import Context from 'src/Context'

import Glob from 'src/Unit/Glob'
import Watch from 'src/Unit/Watch'

import Unit from 'src/Unit'
import Rebase from 'src/Unit/Rebase'
import File from 'src/Unit/File'

import Es5 from 'src/metal/Es5'

describe('Es6', () =>
{
	var es6_org = origin('es6')
	var es6_cl  = collate('deflow')

	var Identity = Unit(x => x)

	function Gen (src, dst)
	{
		return Es5()
		.pipe(Rebase(src(), dst()))
		.pipe(File.Entry())
	}

	it('Rollup(flow)', async () =>
	{
		var tm = tmp()

		var glob = Glob.Each(es6_org('**/*.js'), Gen(es6_org, tm))

		await glob(Context(null)).output

		compare(es6_cl(), tm())
	})

	it('Rollup(flow) pipe', async () =>
	{
		var tm = tmp()

		var glob = Glob.Each(es6_org('**/*.js'), Identity)
		var unit = glob.pipe(Gen(es6_org, tm))

		await unit(Context(null)).output

		compare(es6_cl(), tm())
	})

	it('Rollup(flow) Watch', async () =>
	{
		var tm = tmp()

		var watch = Watch(es6_org('**/*.js'), Gen(es6_org, tm))

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
