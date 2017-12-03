/* @flow */

import { expect } from 'chai'

import Context from 'src/Context'
import Entry from 'src/Entry'
import Rebase from 'src/Unit/Rebase'

describe('Rebase', () =>
{
	it('Rebase(from, to)', async () =>
	{
		var entry = Entry('/src/foo/bar.js', { content: 'content' })
		var context = Context(entry)

		var unit = Rebase('/src', '/dst')

		var outcome = await unit(context)
		var { output } = outcome

		expect(output.filename).eq('/dst/foo/bar.js')
		expect(output.content.content).eq('content')
	})
})
