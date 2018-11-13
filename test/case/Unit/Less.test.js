/* @flow */

import autoprefixer from 'autoprefixer'

import tmp from 'src/rootpath/tmp'
import origin from 'src/rootpath/origin'
import collate from 'src/rootpath/collate'

import compare from 'src/compare'

import Context from 'src/Context'

import Load   from 'src/Unit/Load'

import Rebase from 'src/Unit/Entry/Rebase'
import Ext    from 'src/Unit/Entry/Ext'
import File   from 'src/Unit/Entry/File'

import Less from 'src/Unit/Less'
import Postcss from 'src/Unit/Postcss'

describe('Less', () =>
{
	var less_org = origin('less')
	var context_null = Context(null)

	it('Entry', async () =>
	{
		var tm = tmp()
		var es5_cl  = collate('less/simple')

		var u = Load(less_org('index.less'))
		.pipe(Less())
		.pipe(Rebase(less_org(), tm()))
		.pipe(Ext('less', 'css'))
		.pipe(File())

		await u(context_null).promise

		compare(es5_cl(), tm())
	})

	it('Autoprefixer', async () =>
	{
		var tm = tmp()
		var es5_cl  = collate('less/prefix')

		var u = Load(less_org('index.less'))
		.pipe(Less())
		.pipe(Postcss([ autoprefixer([ 'last 4 version' ]) ]))
		.pipe(Rebase(less_org(), tm()))
		.pipe(Ext('less', 'css'))
		.pipe(File())

		await u(context_null).promise

		compare(es5_cl(), tm())
	})
})
