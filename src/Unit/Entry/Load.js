/* @flow */

import Load from '../Load'

export default function ()
{
	return Load((entry /* :$Entry<any> */) => entry.filename)
}
