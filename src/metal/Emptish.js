/* @flow */

import Content from '../Unit/Content'

export default function Emptish ()
{
	var block = /\/\*\s*\*\/\n?/g
	var line  = /\/\/\s*\n/g

	var multinw = /\n\n+/g

	return Content(content =>
	{
		content = content.replace(block, '')
		content = content.replace(line, '')
		content = content.replace(multinw, '\n\n')

		return content
	})
}
