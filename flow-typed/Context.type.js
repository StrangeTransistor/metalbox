
interface $Context<$in, $prov: $Providers$Base>
{
	input: $in,

	once:  boolean, /* TODO: consider removing */
	live:  boolean,

	engine: Object,
	providers: $Providers<$prov>,

	derive <$d_in> (input: $d_in): $Context<$d_in, $prov>,

	derive <$d_in, $prov_add: $Providers$Base>
	(
		input: $d_in,
		providers: $prov_add
	)
	: $Context<$d_in, $prov & $prov_add>,
}
