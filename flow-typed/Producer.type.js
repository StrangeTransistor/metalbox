
type $Producer
<
	$in: Iterable<*>,
	$out
>
 = (...args: $in) => $Promisable<$out>

type $Streaming<$out> = flyd$Stream<$out> | $Promisable<$out>

type $Producer$Streaming
<
	$in: Iterable<*>,
	$out
>
 = (...args: $in) => $Streaming<$out>
