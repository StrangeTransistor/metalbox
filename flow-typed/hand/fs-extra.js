
declare module 'fs-extra'
{
	declare function readFile
	(
		path: string | Buffer | URL | number
	)
	: Promise<Buffer>

	declare function readFile
	(
		path: string | Buffer | URL | number,
		encoding: string
	)
	: Promise<string>

	declare function readFile
	(
		path: string | Buffer | URL | number,
		options: { encoding: string; flag?: string }
	)
	: Promise<string>

	declare function readFile
	(
		path: string | Buffer | URL | number,
		options: { flag?: string }
	)
	: Promise<Buffer>

	declare function writeFile
	(
		filename: string | Buffer | number,
		data: Buffer | string,
		options?: string |
		{
			encoding?: ?string,
			mode?: number,
			flag?: string
		}
	)
	: Promise<void>

	declare function ensureDir(dir: string): Promise<void>

	declare function ensureDirSync(dir: string): void

	declare function copy
	(
		src:  string,
		dest: string,
		options?: Object
	)
	: Promise<void>

	declare function move
	(
		src:  string,
		dest: string,
		options?: Object
	)
	: Promise<void>

	declare function unlink(path: string): Promise<void>
}
