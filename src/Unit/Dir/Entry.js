/* @flow */
/* ::

type $Dir$Entry$Options =
{
	path_dirname: boolean,
}

*/

var assign = Object.assign

import { dirname } from 'path'

import Dir from './Dir'

export default function /* ::<$in: $Entry<*>, $prov: $Providers$Base> */
(
	options /* :$Shape<$Dir$Entry$Options> */
)
	/* :$Unit<$in, $prov, void> */
{
	var Σoptions = assign({ path_dirname: true }, options)

	return Dir((entry /* :$in */) =>
	{
		var filename = entry.filename

		if (Σoptions.path_dirname)
		{
			filename = dirname(filename)
		}

		return filename
	})
}
