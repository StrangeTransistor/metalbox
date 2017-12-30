
type $Outcome$Value<$out> = flyd$Stream<$out> | $Promisable<$out>

type $Outcome<$out> =
{
	stream: (flyd$Stream<$out> | null),
	output:  Promise<$out>,
}
