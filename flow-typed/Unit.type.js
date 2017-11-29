
type $Unit$Fn<$in, $out> = $Producer<[ $Context<$in> ], $out>

;

type $Unit<$in, $out> =
{
	(context: $Context<$in>): Promise<$Outcome<$out>>,

	pipe<$out_next> (next: $Unit<$out, $out_next>): $Unit<$in, $out_next>,
	before<$in_before> (map: $Unit<$in_before, $in>): $Unit<$in_before, $out>,
}
