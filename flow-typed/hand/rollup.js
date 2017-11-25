
declare module 'rollup'
{
	declare type Options =
	{
		input: string,
	}

	;

	declare type Bundle =
	{
		generate (options: any): { code: string, map?: ?Object }
	}

	;

	declare function rollup (options: Options): Promise<Bundle>
}
