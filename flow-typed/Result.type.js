
type $Hrtime = [ number, number ]

type $Result$Raw<$out> =
{
	promise: Promise<$out>,
	stream: flyd$Stream<$out>,
}

type $Result<$out> =
{
	promise: Promise<$out>,
	stream: flyd$Stream<$out>,

	alive (): flyd$Stream<$out>,

	time:
	{
		start:  $Hrtime,
		stop:  ?$Hrtime,
		taken: ?$Hrtime,
	}
}
