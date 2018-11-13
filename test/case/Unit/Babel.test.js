/* @flow */

import { expect } from 'chai'

import Entry from 'src/Entry'
import Context from 'src/Context'

import Babel from 'src/Unit/Babel'

describe('Babel', () =>
{
	it('works', async () =>
	{
		var entry = Entry('babel.js', { content: 'var foo = 1' })
		var context = Context(entry)

		var b = Babel({ minified: true })

		var result = b(context)
		var output = await result.promise

		expect(output.content.content).eq('var foo=1;')
	})

	it('works', async () =>
	{
		var entry = Entry('babel.js', { content: 'var foo = 1\nvar bar = 2' })
		var context = Context(entry)

		// TODO: fix transient `babel-helper-evaluate-path`
		var b = Babel({ presets: [ 'babel-preset-minify' ] })

		var result = b(context)
		var output = await result.promise

		expect(output.content.content).eq('var foo=1,bar=2;')
	})
})
