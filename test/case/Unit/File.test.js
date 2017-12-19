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

	it('not absolute path', async () =>
	{
		var unit = File('abc', '')

		await expect(unit(context_null))
		.rejectedWith('filename_must_be_absolute_path')
	})
})

describe('File.Name', () =>
{
	var cl1 = collate('file/1')
	var context_string = Context('content\n')

	it('File.Name(str)', async () =>
	{
		var tm = tmp()

		var unit = File.Name(tm('abc'))

		await unit(context_string)

		compare(cl1(), tm())
	})
})

describe('File.Entry', () =>
{
	var cl1 = collate('file/1')

	it('File.Entry()', async () =>
	{
		var tm = tmp()
		var context_entry = Context(Entry(
			tm('abc'),
			{ content: 'content\n' }
		))

		var unit = File.Entry()

		await unit(context_entry)

		compare(cl1(), tm())
	})
})

describe('File.Copy', () =>
{
	var cl1 = collate('file/2')
	var context_null = Context(null)

	it('File.Copy()', async () =>
	{
		var tm = tmp()

		var unit = File(tm('def'), 'content\n')
		.pipe(File.Copy(
			      () => delay(200, tm('def')),
			async () => delay(100, tm('abc'))
		))

		await unit(context_null)

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

		var unit = File(tm('def'), 'content\n')
		.pipe(File.Move(
			      () => delay(200, tm('def')),
			async () => delay(100, tm('abc'))
		))

		await unit(context_null)

		compare(cl1(), tm())
	})
})

describe('File.Remove', () =>
{
	var cl1 = collate('file/1')
	var context_null = Context(null)

	it('File.Remove()', async () =>
	{
		var tm = tmp()

		var unit =
		File(tm('def'), '')
		.pipe(File(tm('abc'), 'content\n'))
		.pipe(File.Remove(tm('def')))

		await unit(context_null)

		compare(cl1(), tm())
	})
})
