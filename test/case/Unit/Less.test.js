/* @flow */

import tmp from 'src/rootpath/tmp'
import origin from 'src/rootpath/origin'
import collate from 'src/rootpath/collate'

import compare from 'src/compare'

import Entry from 'src/Entry'
import Context from 'src/Context'

import Load   from 'src/Unit/Entry/Load'
import Rebase from 'src/Unit/Entry/Rebase'
import File   from 'src/Unit/Entry/File'

import Less from 'src/Unit/Less'

describe('Less', () =>
{
	var less_org = origin('less')
	var es5_cl  = collate('less')

	it('Entry', async () =>
	{
		var tm = tmp()

		var entry = Entry(less_org('index.less'))
		var context = Context(entry)

		var u = Load()
		.pipe(Less())
		.pipe(Rebase(less_org(), tm()))
		.pipe(File())

		await u(context).output

		compare(es5_cl(), tm())
	})
})
