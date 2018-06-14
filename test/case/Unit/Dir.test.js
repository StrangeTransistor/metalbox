/* @flow */

import tmp from 'src/rootpath/tmp'
import collate from 'src/rootpath/collate'

import compare from 'src/compare'

import Context from 'src/Context'
import Entry from 'src/Entry'

import File from 'src/Unit/File'
import FileEntry from 'src/Unit/Entry/File'

import Dir from 'src/Unit/Dir'
import Ensure from 'src/Unit/Dir/Ensure'

describe('Dir', () =>
{
	var context_null = Context(null)

	it('Dir(str)', async () =>
	{
		var tm = tmp()
		var cl = collate('dir/1')

		var unit = Dir(tm('foo'))
		.pipe(File(tm('foo/abc'), ''))

		await unit(context_null).output

		compare(cl(), tm())
	})

	it('Dir(nested path)', async () =>
	{
		var tm = tmp()
		var cl = collate('dir/2')

		var unit = Dir(tm('foo/bar'))
		.pipe(File(tm('foo/bar/abc'), ''))

		await unit(context_null).output

		compare(cl(), tm())
	})
})

describe('Dir/Ensure', () =>
{
	it('Dir/Ensure(entry)', async () =>
	{
		var tm = tmp()
		var cl = collate('dir/2')

		var context = Context(Entry(
			tm('foo/bar/abc'),
			{ content: '' }
		))

		var unit = Ensure(FileEntry())

		await unit(context).output

		compare(cl(), tm())
	})
})
