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
	...args /* : Rootpath$Path[] */
)
{
	return Glob(Src(...args))
	.pipe(Copy(Filename, Rebased))
}
