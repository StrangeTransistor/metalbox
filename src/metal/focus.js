/* @flow */
/* ::

import type { $Rootpath } from '@streetstrider/rootpath'
import type { Rootpath$Path } from '@streetstrider/rootpath'

type $SrcDst = $Demands<{ src: $Rootpath, dst: $Rootpath }>

*/

export function Src /* ::<$Src: $Demands<{ src: $Rootpath }>> */
(
	...args /* :Rootpath$Path[] */
)
{
	return function (_ /* :any */, { providers: { src }} /* :$Src */)
		/* :string */
	{
		return src(...args)
	}
}

Src.Globs = function /* ::<$Src: $Demands<{ src: $Rootpath }>> */
(
	globs /* :$Glob[] */
)
{
	return function (_ /* :any */, { providers: { src }} /* :$Src */)
		/* :string[] */
	{
		return globs.map(glob => src(glob))
	}
}

export function Dst /* ::<$Dst: $Demands<{ dst: $Rootpath }>> */
(
	...args /* :Rootpath$Path[] */
)
{
	return function (_ /* :any */, { providers: { dst }} /* :$Dst */)
		/* :string */
	{
		return dst(...args)
	}
}

export function Filename (entry /* :$Entry<any> */)
{
	return entry.filename
}

export function Rebased (
	{ filename }               /* :$Entry<any> */,
	{ providers: { src, dst }} /* :$SrcDst */
)
{
	return dst(src.relative(filename))
}
