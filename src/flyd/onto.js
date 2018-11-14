/* @flow */
/* ::

type $Stream<T> = flyd$Stream<T> | ((T) => any)

*/

import { on } from 'flyd'

export default function onto /* ::<T> */
(
	src /* :$Stream<T> */,
	dst /* :$Stream<T> */
)
{
	on(dst, src)
}
