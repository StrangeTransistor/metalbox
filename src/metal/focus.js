/* @flow */
/* ::

import type { $Rootpath } from '@streetstrider/rootpath'
import type { Rootpath$Path } from '@streetstrider/rootpath'

type $Demands<T> = { providers: $Providers<$Subtype<T>> }

*/

export function Src /* ::<$Src: $Demands<{ src: $Rootpath }>> */
(
	...args /* : Rootpath$Path[] */
)
{
	return function (_ /* :any */, { providers: { src }} /* :$Src */)
		/* :string */
	{
		return src(...args)
	}
}

export function Dst /* ::<$Dst: $Demands<{ dst: $Rootpath }>> */
(
	...args /* : Rootpath$Path[] */
)
{
	return function (_ /* :any */, { providers: { dst }} /* :$Dst */)
		/* :string */
	{
		return dst(...args)
	}
}
