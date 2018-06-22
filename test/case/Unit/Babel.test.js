/* @flow */

import { expect } from 'chai'

import Entry from 'src/Entry'
import Context from 'src/Context'

import Babel from 'src/Unit/Babel'

describe('Babel', () =>
{
	it('works', async () =>
	{
		var entry = Entry('babel.js', { content: 'var x = 1' })
		var context = Context(entry)

		var b = Babel({ minified: true })

		var outcome = b(context)
		var output = await outcome.output

		expect(output.content.content).eq('var x=1;')
	})
})
