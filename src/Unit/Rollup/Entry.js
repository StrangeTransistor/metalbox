/* @flow */
/* ::

import type { OutputOptions as $Rollup$OutputOptions } from 'rollup'

*/

import Rollup from './Rollup'

export default function (options /* :: ?:$Shape<$Rollup$Options> */)
{
	return Rollup/* :: <*, any> */(
		(entry /* :$Entry<void> */) => entry.filename,
		options
	)
}
