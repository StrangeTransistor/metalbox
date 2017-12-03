/* @flow */

import { expect } from 'chai'

// import tmp from 'src/tmp'
// import collate from 'src/collate'
import origin from 'src/origin'

// import compare from 'src/compare'

import Context from 'src/Context'

import Rollup  from 'src/Unit/Rollup/Rollup'
import { Cjs } from 'src/Unit/Rollup/Rollup'
// import File from 'src/Unit/File'

describe('Rollup', () =>
{
	it('Rollup(input)', async () =>
	{
		var org = origin('rollup')
		var context = Context(null)

		var rollup = Rollup(org('index.js'))
		var cjs    = Cjs()

		var unit = rollup.pipe(cjs)

		var outcome = await unit(context)

		expect(outcome).an('object')
		expect(outcome.output).an('object')

		var codepair = outcome.output.content

		// eslint-disable-next-line max-len
		expect(codepair.content).eq("'use strict';\n\nfunction main ()\n{\n\tconsole.log('main');\n}\n\nmodule.exports = main;\n")
		expect(codepair.sourcemap).null
	})
})
