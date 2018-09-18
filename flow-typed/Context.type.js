
interface $Context<$in, $prov: $Providers$Base>
{
	input: $in,

	once:  boolean, /* TODO: consider removing */
	live:  boolean,

	engine: Object,
	providers: $Providers<$prov>,

	derive <$d_in, $prov_add: $Providers$Base> ($d_in, $prov_add)
	: $Context<$d_in, $prov & $prov_add>,

	derive <$d_in> ($d_in): $Context<$d_in, $prov>,
}
