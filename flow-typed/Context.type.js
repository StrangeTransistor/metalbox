
interface $Context<$in>
{
	input: $in,

	first: boolean,
	once:  boolean,
	live:  boolean,

	engine:  Object,
	storage: Object,
}
