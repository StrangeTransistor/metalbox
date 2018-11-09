/* @flow */

import Pug from './Pug'

export default function (options /* :: ?:Object */)
{
	return Pug/* :: <*, any> */(
		(entry /* :$Entry<void> */) => entry.filename,
		options
	)
}
