
type $Computable
<
	$in: $Iterable<*, *, *>,
	$out
>
 = $out | $Producer<$in, $out>
