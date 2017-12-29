
type $Outcome$Value<$out> = flyd$Stream<$out> | $Promisable<$out>

type $Outcome<$out> =
{
	output: Promise<$out>,
}
