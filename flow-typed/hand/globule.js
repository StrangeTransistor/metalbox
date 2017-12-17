
declare module 'globule'
{
	declare type Options = Object

	;

	declare function find (patterns: string[], options?: Options): string[]
	declare function find (options: Options): string[]
}
