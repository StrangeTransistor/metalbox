
declare module 'randomstring'
{
	declare interface Options
	{
		length?: number,
		capitalization?: 'lowercase' | 'uppercase'
	}

	declare function generate (options: Options): string
}
