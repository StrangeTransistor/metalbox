/* @flow */

import Load from '../Load'

export default function Entry ()
{
	return Load(entry => entry.filename)
}
