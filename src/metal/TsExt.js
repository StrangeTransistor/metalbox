/* @flow */

import Rename from '../Unit/Entry/Rename'

export default function TsExt ()
{
	return Rename(filename => filename.replace(/\.ts$/, '.js'))
}
