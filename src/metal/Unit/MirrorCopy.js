/* @flow */

/* ::

import type { $Mode } from '../Unit/Feed'

*/

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
	/* :$Unit<any, $Mode, void> */
{
	var focus  /* :$Producer<any, $Glob>  */ = Src.Globs([].concat(globs))
	var rebase /* :$Producer<any, string> */ = Rebased

	return Feed(focus, void 0, options)
	.pipe(Copy(Filename, rebase))
}
