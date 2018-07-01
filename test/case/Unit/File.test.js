/* @flow */

import bluebird from 'bluebird'
var delay = bluebird.delay

import { expect } from 'chai'

import tmp from 'src/rootpath/tmp'
import collate from 'src/rootpath/collate'

import compare from 'src/compare'

import Context from 'src/Context'
import Entry from 'src/Entry'

import File from 'src/Unit/File'
import Remove from 'src/Unit/File/Remove'

import FileEntry from 'src/Unit/Entry/File'
import RemoveEntry from 'src/Unit/Entry/File/Remove'

var typical_content = 'content\n'

describe('File', () =>
{
	var cl1 = collate('file/1')
	var context_null = Context(null)

	it('File(str, str)', async () =>
	{
		var tm = tmp()

		var unit = File(tm('abc'), typical_content)

		await unit(context_null).output

		compare(cl1(), tm())
	})

	it('File(str, computable)', async () =>
	{
		var tm = tmp()

		var unit = File(tm('abc'), async () => typical_content)

		await unit(context_null).output

		compare(cl1(), tm())
	})

	it('File(computable, str)', async () =>
	{
		var tm = tmp()

		var unit = File(() => tm('abc'), typical_content)

		await unit(context_null).output

		compare(cl1(), tm())
	})

	it('File(computable, computable)', async () =>
	{
		var tm = tmp()

		var unit = File(() => tm('abc'), async () => typical_content)

		await unit(context_null).output

		compare(cl1(), tm())
	})

	it('File(delay computable, delay computable)', async () =>
	{
		var tm = tmp()

		var unit = File(
			      () => delay(25, tm('abc')),
			async () => delay(50, typical_content)
		)

		await unit(context_null).output

		compare(cl1(), tm())
	})

	it('not absolute path', async () =>
	{
		var unit = File('abc', '')

		await expect(unit(context_null).output)
		.rejectedWith('filename_must_be_absolute_path')
	})
})

describe('File.Copy', () =>
{
	var cl1 = collate('file/2')
	var context_null = Context(null)

	it('File.Copy()', async () =>
	{
		var tm = tmp()

		var unit = File(tm('def'), typical_content)
		.pipe(File.Copy(
			      () => delay(50, tm('def')),
			async () => delay(25, tm('abc'))
		))

		await unit(context_null).output

		compare(cl1(), tm())
	})
})

describe('File.Move', () =>
{
	var cl1 = collate('file/1')
	var context_null = Context(null)

	it('File.Move()', async () =>
	{
		var tm = tmp()

		var unit = File(tm('def'), typical_content)
		.pipe(File.Move(
			      () => delay(50, tm('def')),
			async () => delay(25, tm('abc'))
		))

		await unit(context_null).output

		compare(cl1(), tm())
	})
})

describe('Entry/File', () =>
{
	var cl1 = collate('file/1')

	it('Entry/File()', async () =>
	{
		var tm = tmp()
		var context_entry = Context(Entry(
			tm('abc'),
			{ content: typical_content }
		))

		var unit = FileEntry()

		await unit(context_entry).output

		compare(cl1(), tm())
	})
})

describe('Remove', () =>
{
	var cl1 = collate('file/1')
	var context_null = Context(null)

	it('File/Remove()', async () =>
	{
		var tm = tmp()

		var unit =
		File(tm('def'), '')
		.pipe(File(tm('abc'), typical_content))
		.pipe(Remove(tm('def')))

		await unit(context_null).output

		compare(cl1(), tm())
	})

	it('Entry/Remove()', async () =>
	{
		var tm = tmp()

		var pre =
		File(tm('def'), '')
		.pipe(File(tm('abc'), typical_content))

		await pre(context_null).output

		var unit = RemoveEntry()

		await unit(Context(Entry(
			tm('def'),
			Entry.Remove
		)))
		.output

		compare(cl1(), tm())
	})

	it('Remove() works only under /tmp', async () =>
	{
		var r = Remove('/foo/bar/baz')

		await r(Context(null)).output
		.then(
			() => expect(true).eq(false),
			(error) => expect(error.message).eq('filename_must_under_tmpdir')
		)
	})
})
