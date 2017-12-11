
type $Value
<
	$in: $Iterable<*, *, *>,
	$out
>
 = $Producer<$in, $out> | $out

;

type $Computable<$in, $prov: $Providers$Base, $out> = $Value<[ $Context<$in, $prov> ], $out>
