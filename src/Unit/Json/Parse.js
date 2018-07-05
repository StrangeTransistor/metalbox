/* @flow */

import Thru from '../Entry/Thru'

export default function Parse ()
	/* :$Thru<$File, any, any> */
{
	return Thru((content /* :$File */) =>
	{
		return load(content.content)
	})
}

function load (it /* :string */)
{
	return JSON.parse(it)
}
