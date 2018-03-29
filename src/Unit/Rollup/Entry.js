/* @flow */
/* ::

import type { OutputOptions as $Rollup$OutputOptions } from 'rollup'

*/

import Rollup from './Rollup'

export default function (options /* :: ?:$Shape<$Rollup$Options> */)
{
	return Rollup(
		(entry /* :$Entry<any> */) => entry.filename,
		options
	)
}
