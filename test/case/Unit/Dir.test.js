/* @flow */

// import { expect } from 'chai'

import tmp from 'src/tmp'
import collate from 'src/collate'
import compare from 'src/compare'

import Context from 'src/Context'
// import Entry from 'src/Entry'

import Dir from 'src/Unit/Dir'
import File from 'src/Unit/File'

describe('File', () =>
{
	var context_null = Context(null)

	it('Dir(str)', async () =>
	{
		var tm = tmp()
		var cl = collate('dir/1')

		var unit = Dir(tm('foo'))
		.pipe(File(tm('foo/abc'), ''))

		await unit(context_null)

		compare(cl(), tm())
	})

	it('Dir(nested path)', async () =>
	{
		var tm = tmp()
		var cl = collate('dir/2')

		var unit = Dir(tm('foo/bar'))
		.pipe(File(tm('foo/bar/abc'), ''))

		await unit(context_null)

		compare(cl(), tm())
	})
})
