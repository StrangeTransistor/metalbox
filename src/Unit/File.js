/* @flow */

// import { isAbsolute as is_abs } from 'path'
// import { writeFile  as write }  from 'mz/fs'

import Unit from './Unit'

export default function File
(
	filename /* :$Computable<*, string> */,
	content  /* :$Computable<*, string> */
)
{
	return Unit(async () =>
	{
		console.log(filename)
		console.log(content)
	})
}
