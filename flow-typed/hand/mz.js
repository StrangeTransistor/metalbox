
declare module 'mz/fs'
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
}
