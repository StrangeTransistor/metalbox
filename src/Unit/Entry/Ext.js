/* @flow */

import Rename from './Rename'

export default function Ext (from /* :string */, to /* :string */)
{
	return Rename(filename =>
	{
		var r = new RegExp(`\\.${ from }$`)

		return filename.replace(r, `.${ to }`)
	})
}
