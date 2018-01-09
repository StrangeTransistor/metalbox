
interface $Context<$in, $prov: $Providers$Base>
{
	input: $in,

	once:  boolean,
	live:  boolean,

	engine: Object,
	providers: $Providers<$prov>,

	derive <$d_in> (input: $d_in): $Context<$d_in, $prov>,
}
