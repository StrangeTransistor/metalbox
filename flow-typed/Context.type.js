
interface $Context<$in, $prov: $Providers$Base>
{
	input: $in,

	first: boolean,
	once:  boolean,
	live:  boolean,

	engine: Object,
	providers: $Providers<$prov>,
}
