/* @flow */

import rootpath from '@streetstrider/rootpath'

import tmp from '../../../src/tmp'
import File from '../../../src/Unit/File'

import compare from '../../../src/compare'

describe('File', () =>
{
	it('File(str, str)', async () =>
	{
		var cl = rootpath(__dirname, '../../collate/file/1')
		var tm = tmp()

		var unit = File(tm('abc'), 'content\n')

		var context =
		{
			input: null,

			first: true,
			once: false,
			live: false,

			engine:  {},
			storage: {},
		}

		await unit(context)

		compare(cl(), tm())
	})
})
