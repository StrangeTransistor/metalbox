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

		var content = Content(content => content + '_def')

		var outcome = content(Context(entry))
		var output  = await outcome.output

		expect(output.filename).eq('foo')
		expect(output.content.content).eq('abc_def')
	})
})
