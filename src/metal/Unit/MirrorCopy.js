/* @flow */

import Glob from '../../Unit/Glob'
import Copy from '../../Unit/File/Copy'

import { Src } from '../focus'
import { Filename } from '../focus'
import { Rebased } from '../focus'

export default function MirrorCopy
(
	globs /* :$Glob */,
	options /* :: ?:$Shape<$Glob$Options> */
)
{
	return Glob(Src.Globs([].concat(globs)), void 0, options)
	.pipe(Copy(Filename, Rebased))
}
