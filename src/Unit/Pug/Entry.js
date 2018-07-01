/* @flow */

import Pug from './Pug'

export default function (options /* :: ?:Object */)
{
	return Pug(
		(entry /* :$Entry<void> */) => entry.filename,
		options
	)
}
