/* @flow */

import Content from '../Unit/Entry/Content'

export default function Emptish ()
{
	var iop = /\biop\b/
	var iop_invoke = /\b_interopDefault\(/g

	return Content(content =>
	{
		if (! content.match(iop))
		{
			content = content.replace('function _interopDefault', 'function iop')
			content = content.replace(iop_invoke, 'iop(')
		}

		return content
	})
}
