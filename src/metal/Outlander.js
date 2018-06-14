/* @flow */

import { Linter } from 'eslint'
import outlander  from 'js-outlander'

import Content from '../Unit/Entry/Content'

export default function Outlander ()
{
	var linter = new Linter

	return Content(content =>
	{
		var verf = linter.verifyAndFix(content, outlander)

		return verf.output
	})
}
