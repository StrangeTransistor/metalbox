
declare module 'chokidar'
{
	declare type Options = Object

	;

	declare function watch (patterns: string[], options?: Options): events$EventEmitter
}
