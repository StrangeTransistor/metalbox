/* @flow */

import bluebird from 'bluebird'
var { join } = bluebird

import unroll from '../../unroll'

import prep_path from './prep-path'
import ensure_abs from './ensure-abs'

export default async function prep_binary_op
	/* ::<$in, $prov: $Providers$Base> */
(
	context /* :$Context<$in, $prov> */,
	src     /* :$Computable<$in, $prov, string> */,
	dst     /* :$Computable<$in, $prov, string> */,
	options /* :$Shape<$File$Options> */
)
{
	[ src, dst ] = await join(
		unroll(context, src),
		prep_path(context, dst, options)
	)

	ensure_abs(src)
	ensure_abs(dst)

	return [ src, dst ]
}
