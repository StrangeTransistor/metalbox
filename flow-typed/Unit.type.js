
type $Fn<$in, $out> = $Producer<[ $Context<$in> ], $out>

;

type $Unit<$in, $out> =
{
	(context: $Context<$in>): Promise<$Outcome<$out>>,
}
