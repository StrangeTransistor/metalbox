
declare module '@streetstrider/rootpath'
{
	declare type Rootpath$Segment = string | $Rootpath;

	declare type Rootpath$Path = Rootpath$Segment | Rootpath$Path[];

	declare interface Rootpath$Resolver
	{
		(...args: Rootpath$Path[]): string,
	}

	declare interface Rootpath$Constructor
	{
		new (...args: Rootpath$Path[]): $Rootpath,
		(...args: Rootpath$Path[]): $Rootpath
	}

	declare interface $Rootpath extends Rootpath$Resolver
	{
		path: string,
		resolve: Rootpath$Resolver,
		relative(to: Rootpath$Segment): string,
		partial: Rootpath$Constructor,
		contains(path: Rootpath$Segment): boolean,
		toString(): string,
	}

	declare module.exports: Rootpath$Constructor
}
