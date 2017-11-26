
declare module 'rollup'
{
	declare type InputOptions =
	{
		input: string,
	}

	;

	declare type OutputOptions =
	{
		format: 'cjs' | 'iife' | 'es' | 'umd' | 'amd',
		exports?: 'auto' | 'default' | 'named' | 'none',
		sourcemap?: boolean,
	}

	;

	declare type Bundle =
	{
		generate (options: OutputOptions): Output,
	}

	;

	declare type Output =
	{
		code: string,
		map: ?Object,
	}

	;

	declare function rollup (options: InputOptions): Promise<Bundle>
}
