
type $Hrtime = [ number, number ]

type $Outcome<$out> =
{
	stream: (flyd$Stream<$out> | null),
	output:  Promise<$out>,
	return: $Streaming<$out>,

	time:
	{
		start:  $Hrtime,
		stop:  ?$Hrtime,
		taken: ?$Hrtime,
	}
}
