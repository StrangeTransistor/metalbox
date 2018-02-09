
type $Unit$Fn<$in, $prov: $Providers$Base, $out>
 = $Producer$Streaming<[ $in, $Context<$in, $prov> ], $out>

;

type $Unit<$in, $prov: $Providers$Base, $out> =
{
	(context: $Context<$in, $prov>): $Outcome<$out>,

	family: string,

	pipe<$out_next> (next: $Unit<$out, $prov, $out_next>): $Unit<$in, $prov, $out_next>,
	pre<$out_next>  (next: $Unit<$in,  $prov, $out_next>): $Unit<$in, $prov, $out_next>,
	fork<$out_next> (next: $Unit<$in,  $prov, $out_next>): $Unit<$in, $prov, [ $out, $out_next ]>,
}
