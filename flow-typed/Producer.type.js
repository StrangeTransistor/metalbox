
type $Producer
<
	$in: $Iterable<*, *, *>,
	$out
>
 = (...args: $in) => $Promisable<$out>
