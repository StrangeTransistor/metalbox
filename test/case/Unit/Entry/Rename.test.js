/* @flow */

import { expect } from 'chai'

import Context from 'src/Context'
import Entry from 'src/Entry'

import Rename from 'src/Unit/Entry/Rename'

describe('Rename', () =>
{
	it('works', async () =>
	{
		var entry = Entry('foo', { content: 'abc' })

		var rename = Rename(async (filename) => filename + '_bar')

		var result = rename(Context(entry))
		var output  = await result.promise

		expect(output.filename).eq('foo_bar')
		expect(output.content.content).eq('abc')
	})
})
