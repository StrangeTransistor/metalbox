/* @flow */

import { expect } from 'chai'

import Entry from 'src/Entry'
import Context from 'src/Context'

import Parse from 'src/Unit/Json/Parse'

describe('Json', () =>
{
	describe('Parse', () =>
	{
		it('works', async () =>
		{
			var entry = Entry('f.json', { content: '{"x":17}' })

			var parse = Parse()

			var output = await parse(Context(entry)).output

			expect(output).deep.eq(
			{
				filename: 'f.json',
				content:
				{
					x: 17
				}
			})
		})
	})
})
