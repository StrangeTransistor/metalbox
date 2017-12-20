
declare module 'rollup'
{
	declare type InputOptions =
	{
		input: string,
		plugins?: Plugin[],
	}

	;

	declare type Plugin = Object

	;

	declare type Bundle =
	{
		generate (options: OutputOptions): Output,
	}

	;

	declare function rollup (options: InputOptions): Promise<Bundle>

	;

	declare type Format  =  'cjs' |    'iife' |    'es' | 'umd' | 'amd'
	;
	declare type Exports = 'auto' | 'default' | 'named' | 'none'

	;

	declare type OutputOptions =
	{
		format:     Format,
		exports?:   Exports,
		sourcemap?: boolean,
	}

	;

	declare type Output =
	{
		code: string,
		map: ?Object,
	}
}
