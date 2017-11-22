/* @flow */

import rootpath from '@streetstrider/rootpath'

import tmp from 'src/tmp'
import collate from 'src/collate'
import compare from 'src/compare'

import Context from 'src/Context'
import File from 'src/Unit/File'


describe('File', () =>
{
	it('File(str, str)', async () =>
	{
		var tm = tmp()
		var cl = collate('file/1')

		var context = Context(null)
		var unit = File(tm('abc'), 'content\n')

		await unit(context)

		compare(cl(), tm())
	})

	it('File(computable, computable)', async () =>
	{
		var tm = tmp()
		var cl = collate('file/1')

		var context = Context(null)
		var unit = File(() => tm('abc'), async () => 'content\n')

		await unit(context)

		compare(cl(), tm())
	})
})
