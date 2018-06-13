/* @flow */

// import tmp from 'src/rootpath/tmp'
import origin from 'src/rootpath/origin'
// import collate from 'src/rootpath/collate'

import Entry from 'src/Entry'
import Context from 'src/Context'

import Load from 'src/Unit/Load'

import Less from 'src/Unit/Less'

describe('Less', () =>
{
	var less_org = origin('less')
	// var es5_cl  = collate('es5')

	it('Entry', async () =>
	{
		var entry = Entry(less_org('index.less'))
		var context = Context(entry)

		var u = Load().pipe(Less())

		var outcome = u(context)

		var output = await outcome.output

		console.log(output.content.content)
	})
})
