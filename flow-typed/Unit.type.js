
type $Unit$Fn<$in, $prov: $Providers$Base, $out>
 = $Producer<[ $in, $Context<$in, $prov> ], $out>

;

type $Unit<$in, $prov: $Providers$Base, $out> =
{
	(context: $Context<$in, $prov>): $Outcome<$out>,

	pipe<$out_next> (next: $Unit<$out, $prov, $out_next>): $Unit<$in, $prov, $out_next>,
	pre<$out_next>  (next: $Unit<$in,  $prov, $out_next>): $Unit<$in, $prov, $out_next>,
}
