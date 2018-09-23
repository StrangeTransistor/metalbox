/* @flow */
/* ::

import type { Rootpath$Path } from '@streetstrider/rootpath'

*/

import Glob from '../../Unit/Glob'
import Copy from '../../Unit/File/Copy'

import { Src } from '../focus'
import { Filename } from '../focus'
import { Rebased } from '../focus'

export default function MirrorCopy
(
	globs /* :$Glob */
)
{
	return Glob(Src.Globs([].concat(globs)))
	.pipe(Copy(Filename, Rebased))
}
