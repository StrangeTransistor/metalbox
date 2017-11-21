/* @flow */

import { tmpdir } from 'os'
import { generate as random } from 'randomstring'
import rootpath from '@streetstrider/rootpath'
import { sync as mkdir } from 'mkdirp'

export default function tmp ()
{
	var hash = random({ length: 5, capitalization: 'uppercase' })

	var fromroot = rootpath(tmpdir(), 'metalbox', hash)

	mkdir(fromroot())

	return fromroot
}
