/* @flow */
/* ::

import type { $Rootpath } from '@streetstrider/rootpath'
import type { Rootpath$Path } from '@streetstrider/rootpath'

type $Src = $Demands<{ src: $Rootpath }>
type $Dst = $Demands<{ dst: $Rootpath }>
type $SrcDst = $Demands<{ src: $Rootpath, dst: $Rootpath }>

*/

export function Src
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

Src.Globs = function
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

export function Dst
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
	/* :string */
{
	return dst(src.relative(filename))
}
