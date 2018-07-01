/* @flow */

import tmp from 'src/rootpath/tmp'
import origin from 'src/rootpath/origin'
import collate from 'src/rootpath/collate'

import compare from 'src/compare'

import Context from 'src/Context'

import Glob from 'src/Unit/Glob/Each'
import Watch from 'src/Unit/Watch'

import Unit from 'src/Unit'
import Rebase from 'src/Unit/Entry/Rebase'
import Load   from 'src/Unit/Entry/Load'
import File   from 'src/Unit/Entry/File'

import Es5 from 'src/metal/Es5'
import FlowDecl from 'src/metal/FlowDecl'

describe('Es5', () =>
{
	var es6_org = origin('es6')
	var es5_cl  = collate('es5')

	var Identity = Unit(x => x)

	function Gen (target /* :$Thru<any, any, $File> */, src, dst)
	{
		return target
		.pipe(Rebase(src(), dst()))
		.pipe(File())
	}

	it('Rollup(flow)', async () =>
	{
		var tm = tmp()

		var glob = Glob(es6_org('**/*.js'), Gen(Es5(), es6_org, tm))

		await glob(Context(null)).output

		compare(es5_cl(), tm())
	})

	it('Rollup(flow) pipe', async () =>
	{
		var tm = tmp()

		var glob = Glob(es6_org('**/*.js'), Identity)
		var unit = glob.pipe(Gen(Es5(), es6_org, tm))

		await unit(Context(null)).output

		compare(es5_cl(), tm())
	})

	it('Rollup(flow) Watch', async () =>
	{
		var tm = tmp()

		var watch = Watch(es6_org('**/*.js'), Gen(Es5(), es6_org, tm))

		var outcome = watch(Context(null))

		setTimeout(() =>
		{
			/* @flow-off */
			outcome.stream.end(true)
		}
		, 200)

		await outcome.output

		compare(es5_cl(), tm())
	})

	it('Rollup(flow + flow files)', async () =>
	{
		var es5_cl = collate('es5-flow')
		var tm = tmp()

		var js   = Gen(Es5(), es6_org, tm)
		var flow = Gen(Load().pipe(FlowDecl()), es6_org, tm)

		var unit = js.fork(flow)

		var glob = Glob(es6_org('**/*.js'), unit)

		await glob(Context(null)).output

		compare(es5_cl(), tm())
	})

	it('Rollup(ts)', async () =>
	{
		var es6_org = origin('es6-ts')
		var tm = tmp()

		var glob = Glob(es6_org('**/*.ts'), Gen(Es5(), es6_org, tm))

		await glob(Context(null)).output

		compare(es5_cl(), tm())
	})
})
