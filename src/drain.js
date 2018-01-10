/* @flow */

import Promise from 'bluebird'

import { on } from 'flyd'

export default function drain /* ::<$value> */
(
	stream /* :flyd$Stream<$value> */
)
	/* :Promise<$value> */
{
	return new Promise(rs =>
	{
		on(() => rs(stream()), stream.end)
	})
}
