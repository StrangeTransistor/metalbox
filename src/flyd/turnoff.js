/* @flow */

import onto from './onto'

export default function turnoff
(
	src /* :flyd$Stream<*> */,
	dst /* :flyd$Stream<*> */
)
{
	onto(src.end, (value) =>
	{
		if (value !== true)     return
		if (dst.end() === true) return
		dst.end(true)
	})
}
