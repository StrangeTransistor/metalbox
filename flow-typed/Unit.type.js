
type $Unit$Fn<$in, $out> = $Producer<[ $Context<$in> ], $out>

;

type $Unit<$in, $out> =
{
	(context: $Context<$in>): Promise<$Outcome<$out>>,

	pipe<$out_next> (next: $Unit<$out, $out_next>): $Unit<$in, $out_next>,
	pre<$out_next>  (next: $Unit<$in,  $out_next>): $Unit<$in, $out_next>,
}
