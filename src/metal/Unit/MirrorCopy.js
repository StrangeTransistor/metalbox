/* @flow */

import Copy from '../../Unit/File/Copy'

import Feed from '../Unit/Feed'

import { Src } from '../focus'
import { Filename } from '../focus'
import { Rebased } from '../focus'

export default function MirrorCopy
(
	globs /* :$Glob */,
	options /* :: ?:$Shape<$Glob$Options> */
)
{
	return Feed(Src.Globs([].concat(globs)), void 0, options)
	.pipe(Copy(Filename, Rebased))
}
