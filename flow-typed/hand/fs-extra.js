
declare module 'fs-extra'
{
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
}
