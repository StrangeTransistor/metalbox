/* @flow */

import { expect } from 'chai'

import Entry from 'src/Entry'
import Context from 'src/Context'

import CssNano from 'src/Unit/CssNano'

describe('CssNano', () =>
{
	it('works', async () =>
	{
		var entry = Entry('babel.js', { content: '.foo { bar: 1; }' })
		var context = Context(entry)

		var m = CssNano()

		var outcome = m(context)
		var output = await outcome.promise

		expect(output.content.content).eq('.foo{bar:1}')
	})
})
