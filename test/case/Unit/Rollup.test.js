/* @flow */

import tmp from 'src/rootpath/tmp'
import collate from 'src/rootpath/collate'
import origin from 'src/rootpath/origin'

import compare from 'src/compare'

import Context from 'src/Context'
import Entry   from 'src/Entry'

import Rollup   from 'src/Unit/Rollup/Rollup'
import { Cjs }  from 'src/Unit/Rollup/Rollup'
import { Es6 }  from 'src/Unit/Rollup/Rollup'
import { Iife } from 'src/Unit/Rollup/Rollup'
import Rebase   from 'src/Unit/Rebase'
import File     from 'src/Unit/File'

describe('Rollup', () =>
{
	var org = origin('rollup')
	var cl_cjs = collate('rollup/cjs')

	it('Cjs Rollup(str)', async () =>
	{
		var tm = tmp()

		var unit = Rollup(org('index.js'))
		.pipe(Cjs())
		.pipe(Rebase(org(), tm()))
		.pipe(File.Entry())

		await unit(Context(null))

		compare(cl_cjs(), tm())
	})

	it('Rollup.Entry', async () =>
	{
		var tm = tmp()

		var context = Context(Entry(org('index.js')))

		var unit = Rollup.Entry()
		.pipe(Cjs())
		.pipe(Rebase(org(), tm()))
		.pipe(File.Entry())

		await unit(context)

		compare(cl_cjs(), tm())
	})

	it('Es6 Rollup(str)', async () =>
	{
		var tm = tmp()

		var context = Context(Entry(org('index.js')))

		var unit = Rollup.Entry()
		.pipe(Es6())
		.pipe(Rebase(org(), tm()))
		.pipe(File.Entry())

		await unit(context)

		compare(collate('rollup/es6')(), tm())
	})

	it('Iife Rollup(str)', async () =>
	{
		var tm = tmp()

		var context = Context(Entry(org('iife.js')))

		var unit = Rollup.Entry()
		.pipe(Iife())
		.pipe(Rebase(org(), tm()))
		.pipe(File.Entry())

		await unit(context)

		compare(collate('rollup/iife')(), tm())
	})
})
