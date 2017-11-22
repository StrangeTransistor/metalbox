/* @flow */

import rootpath from '@streetstrider/rootpath'

import bluebird from 'bluebird'
var delay = bluebird.delay

import tmp from 'src/tmp'
import collate from 'src/collate'
import compare from 'src/compare'

import Context from 'src/Context'
import File from 'src/Unit/File'

describe('File', () =>
{
	var cl1 = collate('file/1')
	var context_null = Context(null)

	it('File(str, str)', async () =>
	{
		var tm = tmp()

		var unit = File(tm('abc'), 'content\n')

		await unit(context_null)

		compare(cl1(), tm())
	})

	it('File(str, computable)', async () =>
	{
		var tm = tmp()

		var unit = File(tm('abc'), async () => 'content\n')

		await unit(context_null)

		compare(cl1(), tm())
	})

	it('File(computable, str)', async () =>
	{
		var tm = tmp()

		var unit = File(() => tm('abc'), 'content\n')

		await unit(context_null)

		compare(cl1(), tm())
	})

	it('File(computable, computable)', async () =>
	{
		var tm = tmp()

		var unit = File(() => tm('abc'), async () => 'content\n')

		await unit(context_null)

		compare(cl1(), tm())
	})

	it('File(delay computable, delay computable)', async () =>
	{
		var tm = tmp()

		var unit = File(
			      () => delay(100, tm('abc')),
			async () => delay(200, 'content\n')
		)

		await unit(context_null)

		compare(cl1(), tm())
	})
})
