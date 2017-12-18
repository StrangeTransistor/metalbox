/* @flow */

import { tmpdir } from 'os'
import { generate as random } from 'randomstring'
import rootpath from '@streetstrider/rootpath'
import { ensureDirSync as mkdirp } from 'fs-extra'

export default function tmp ()
{
	var hash = random({ length: 5, capitalization: 'uppercase' })

	var fromroot = rootpath(tmpdir(), 'metalbox', hash)

	mkdirp(fromroot())

	return fromroot
}
