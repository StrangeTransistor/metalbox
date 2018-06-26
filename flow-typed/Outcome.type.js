
type $Hrtime = [ number, number ]

type $Outcome<$out> =
{
	stream: (flyd$Stream<$out> | null),
	output:  Promise<$out>,

	time:
	{
		start:  $Hrtime,
		stop:  ?$Hrtime,
		taken: ?$Hrtime,
	}
}
