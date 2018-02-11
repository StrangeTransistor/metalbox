/* @flow */

import { on } from 'flyd'

export default function turnoff
(
	src /* :flyd$Stream<*> */,
	dst /* :flyd$Stream<*> */
)
{
	on(handle, src.end)

	function handle (value)
	{
		if (value !== true)     return
		if (dst.end() === true) return
		dst.end(true)
	}
}
