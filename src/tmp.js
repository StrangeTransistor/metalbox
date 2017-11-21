/* @flow */

import { tmpdir } from 'os'
import { generate as random } from 'randomstring'
import rootpath from '@streetstrider/rootpath'

export default function tmp ()
{
	var hash = random({ length: 5, capitalization: 'uppercase' })

	return rootpath(tmpdir(), 'metalbox', hash)
}
