
type $Producer
<
	$in: $Iterable<*, *, *>,
	$out
>
 = (...args: $in) => $Promisable<$out>

;

type $Producer$Streaming
<
	$in: $Iterable<*, *, *>,
	$out
>
 = (...args: $in) => $Outcome$Value<$out>
