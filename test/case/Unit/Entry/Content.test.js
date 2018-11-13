/* @flow */

import { expect } from 'chai'

import Context from 'src/Context'
import Entry from 'src/Entry'

import Content from 'src/Unit/Entry/Content'

describe('Content', () =>
{
	it('works', async () =>
	{
		var entry = Entry('foo', { content: 'abc' })

		var content = Content(async (content) => content + '_def')

		var outcome = content(Context(entry))
		var output  = await outcome.promise

		expect(output.filename).eq('foo')
		expect(output.content.content).eq('abc_def')
	})
})
