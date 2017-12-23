/* @flow */

import Content from '../Unit/Content'

export default function Emptish ()
{
	var emptish = /\/\*\s*\*\/\n?/g
	var multinw = /\n\n+/g

	return Content(content =>
	{
		content = content.replace(emptish, '')
		content = content.replace(multinw, '\n\n')

		return content
	})
}
