/* @flow */

import tmp from 'src/rootpath/tmp'
import origin from 'src/rootpath/origin'
import collate from 'src/rootpath/collate'

import compare from 'src/compare'

import Context from 'src/Context'

import Library from 'src/metal/Release/Library'

import end from 'test/end'

describe('Library', () =>
{
	it('works', async () =>
	{
		var tm  = tmp()
		var org = origin('library/1')
		var cl  = collate('library/1')

		var library = await Library()

		var context = Context(null,
		{
			src: org,
			dst: tm,
		})

		await library(context).output

		compare(cl(), tm())
	})

	it('works live', async () =>
	{
		var tm  = tmp()
		var org = origin('library/1')
		var cl  = collate('library/1')

		var library = await Library()

		var context = Context(null,
		{
			src: org,
			dst: tm,
			live: true,
		})

		var outcome = library(context)

		end(outcome)

		await outcome.output

		compare(cl(), tm())
		// console.log(cl)
	})
})
