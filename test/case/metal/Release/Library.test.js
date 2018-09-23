/* @flow */

import tmp from 'src/rootpath/tmp'
import origin from 'src/rootpath/origin'
import collate from 'src/rootpath/collate'

import compare from 'src/compare'

import Context from 'src/Context'

// import Load   from 'src/Unit/Load'

import Library from 'src/metal/Release/Library'

describe.only('Library', () =>
{
	it('works', async () =>
	{
		var tm  = tmp()
		var org = origin('library/1')
		var cl  = collate('library/1')

		var L = await Library()

		var context = Context(null,
		{
			src: org,
			dst: tm,
		})

		var outcome = L(context)
		var output  = await outcome.output

		console.log('output', output)

		compare(cl(), tm())
	})
})
