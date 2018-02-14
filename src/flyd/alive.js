/* @flow */
/* ::

type Mixed<$value> = flyd$Stream<$value> | $Promisable<$value>

*/

import { isStream as is_stream } from 'flyd'
import { stream } from 'flyd'

import bluebird from 'bluebird'
var resolve = bluebird.resolve

import stream_to from './stream-to'

export default function /* ::<$value> */
(
	value /* :Mixed<$value> */
)
	/* :flyd$Stream<$value> */
{
	if (is_stream(value))
	{
		/* @flow-off */
		return (value /* :flyd$Stream<$value> */)
	}

	/* @flow-off */
	var s /* :flyd$Stream<$value> */ = stream()

	stream_to(resolve(value), s)
	.then(() =>
	{
		s.end(true)
	})

	return s
}
