/* @flow */

import { expect } from 'chai'

import origin from 'src/rootpath/origin'

import Context from 'src/Context'
import Entry   from 'src/Entry'

import Load from 'src/Unit/Load'
import LoadEntry from 'src/Unit/Entry/Load'

describe('Load', () =>
{
	var org = origin('plain')

	it('Load', async () =>
	{
		var unit = Load(org('source.txt'))

		var outcome = unit(Context(null))
		var output = await outcome.promise

		expect_entry(output, org('source.txt'), 'source of content\n')
	})

	it('Load/Entry', async () =>
	{
		var filename = org('source.txt')
		var entry = Entry(filename)
		var context = Context(entry)

		var unit = LoadEntry()

		var outcome = unit(context)
		var output = await outcome.promise

		expect_entry(output, org('source.txt'), 'source of content\n')
	})
})

function expect_entry (entry, filename, content)
{
	expect(entry).property('filename')
	expect(entry.filename).a('string')
	expect(entry.filename).eq(filename)

	expect(entry).property('content')
	expect(entry.content).property('content')
	expect(entry.content).an('object')
	expect(entry.content.content).eq(content)
}
