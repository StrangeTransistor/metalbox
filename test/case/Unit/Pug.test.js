/* @flow */

import tmp from 'src/rootpath/tmp'
import collate from 'src/rootpath/collate'
import origin from 'src/rootpath/origin'

import compare from 'src/compare'

import Context from 'src/Context'
import Entry   from 'src/Entry'

import Pug from 'src/Unit/Pug'
import PugEntry from 'src/Unit/Pug/Entry'

import Rebase from 'src/Unit/Entry/Rebase'
import Ext    from 'src/Unit/Entry/Ext'
import File   from 'src/Unit/Entry/File'

describe('Pug', () =>
{
	var org = origin('pug')
	var cl = collate('pug')

	var context_null = Context(null)

	it('Pug()', async () =>
	{
		var tm = tmp()

		var unit = Pug(org('index.pug'))
		.pipe(Ext('pug', 'htm'))
		.pipe(Rebase(org(), tm()))
		.pipe(File())

		await unit(context_null).promise

		compare(cl(), tm())
	})

	it('Entry', async () =>
	{
		var tm = tmp()

		var context = Context(Entry(org('index.pug')))

		var unit = PugEntry()
		.pipe(Ext('pug', 'htm'))
		.pipe(Rebase(org(), tm()))
		.pipe(File())

		await unit(context).promise

		compare(cl(), tm())
	})
})
