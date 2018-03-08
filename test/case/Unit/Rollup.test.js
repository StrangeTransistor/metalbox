/* @flow */

import tmp from 'src/rootpath/tmp'
import collate from 'src/rootpath/collate'
import origin from 'src/rootpath/origin'

import compare from 'src/compare'

import Context from 'src/Context'
import Entry   from 'src/Entry'

import Rollup   from 'src/Unit/Rollup'
import { Cjs }  from 'src/Unit/Rollup'
import { Es6 }  from 'src/Unit/Rollup'
import { Iife } from 'src/Unit/Rollup'

import Rebase   from 'src/Unit/Rebase'
import File     from 'src/Unit/File'

describe('Rollup', () =>
{
	var org = origin('rollup')
	var cl_cjs = collate('rollup/cjs')

	var context_null = Context(null)

	it('Cjs Rollup(str)', async () =>
	{
		var tm = tmp()

		var unit = Rollup(org('index.js'), { silent: true })
		.pipe(Cjs())
		.pipe(Rebase(org(), tm()))
		.pipe(File.Entry())

		await unit(context_null).output

		compare(cl_cjs(), tm())
	})

	it('Rollup.Entry', async () =>
	{
		var tm = tmp()

		var context = Context(Entry(org('index.js')))

		var unit = Rollup.Entry({ silent: true })
		.pipe(Cjs())
		.pipe(Rebase(org(), tm()))
		.pipe(File.Entry())

		await unit(context).output

		compare(cl_cjs(), tm())
	})

	it('Es6 Rollup(str)', async () =>
	{
		var tm = tmp()

		var unit = Rollup(org('index.js'), { silent: true })
		.pipe(Es6())
		.pipe(Rebase(org(), tm()))
		.pipe(File.Entry())

		await unit(context_null).output

		compare(collate('rollup/es6')(), tm())
	})

	it('Iife Rollup(str)', async () =>
	{
		var tm = tmp()

		var unit = Rollup(org('iife.js'), { silent: true })
		.pipe(Iife())
		.pipe(Rebase(org(), tm()))
		.pipe(File.Entry())

		await unit(context_null).output

		compare(collate('rollup/iife')(), tm())
	})

	it('Cjs Rollup(str, external = true)', async () =>
	{
		var tm = tmp()

		var unit = Rollup(org('index.js'), { external: true })
		.pipe(Cjs())
		.pipe(Rebase(org(), tm()))
		.pipe(File.Entry())

		await unit(context_null).output

		compare(collate('rollup/cjs-external')(), tm())
	})
})
