
type $Value
<
	$in: $Iterable<*, *, *>,
	$out
>
 = $Producer<$in, $out> | $out

;

type $Computable<$in, $out> = $Value<[ $Context<$in> ], $out>
