
type $Value
<
	$in: $Iterable<*, *, *>,
	$out
>
 = $out | $Producer<$in, $out>

;

type $Computable<$in, $out> = $Value<[ $Context<$in> ], $out>
