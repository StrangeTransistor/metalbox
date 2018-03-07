/* @flow */

import { expect } from 'chai'

import origin from 'src/rootpath/origin'

import Context from 'src/Context'
import Entry   from 'src/Entry'

import Load from 'src/Unit/Load'

describe('Load', () =>
{
	var org = origin('plain')

	it('works', async () =>
	{
		var filename = org('source.txt')
		var entry = Entry(filename)
		var context = Context(entry)

		var unit = Load()

		var outcome = unit(context)
		var output = await outcome.output

		expect(output).property('filename')
		expect(output.filename).eq(filename)

		expect(output).property('content')
		expect(output.content).property('content')
		expect(output.content.content).eq('source of content\n')
	})
})
