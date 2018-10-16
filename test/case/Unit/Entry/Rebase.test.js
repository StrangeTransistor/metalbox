/* @flow */

import { expect } from 'chai'

import Context from 'src/Context'
import Entry from 'src/Entry'

import Rebase from 'src/Unit/Entry/Rebase'

describe('Rebase', () =>
{
	it('Rebase(from, to)', async () =>
	{
		var entry = Entry('/src/foo/bar.js', { content: 'content' })
		var context = Context(entry)

		var unit = Rebase('/src', '/dst')

		var output = await unit(context).output

		expect(output.filename).eq('/dst/foo/bar.js')
		expect(output.content.content).eq('content')
	})

	it('async Rebase(from, to)', async () =>
	{
		var entry = Entry('/src/foo/bar.js', { content: 'content' })
		var context = Context(entry)

		var unit = Rebase(
			async () => '/src',
			async () => '/dst'
		)

		var output = await unit(context).output

		expect(output.filename).eq('/dst/foo/bar.js')
		expect(output.content.content).eq('content')
	})

	it('Rebase(from, <empty>)', async () =>
	{
		var entry = Entry('/src/foo/bar.js', { content: 'content' })
		var context = Context(entry)

		var u1 = Rebase('/src', '')
		var u2 = Rebase('/src/foo', '')

		var output = await u1(context).output

		expect(output.filename).eq('foo/bar.js')
		expect(output.content.content).eq('content')

		var output = await u2(context).output

		expect(output.filename).eq('bar.js')
		expect(output.content.content).eq('content')
	})

	it('Rebase(<empty>, to)', async () =>
	{
		var entry = Entry('foo/bar.js', { content: 'content' })
		var context = Context(entry)

		var unit = Rebase('', '/dst')

		var output = await unit(context).output

		expect(output.filename).eq('/dst/foo/bar.js')
		expect(output.content.content).eq('content')
	})
})
