/* @flow */

import Precursor from '../compose/Precursor'

import Entry from './Entry'

export default function /* ::<$in: $Entry<*>, $prov: $Providers$Base, $out> */
(
	unit /* :$Unit<$in, $prov, $out> */
)
	/* :$Unit<$in, $prov, $out> */
{
	return Precursor(Entry(), unit)
}
