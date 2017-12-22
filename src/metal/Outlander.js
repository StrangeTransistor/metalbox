/* @flow */

import { Linter } from 'eslint'

import Unit from '../Unit'
import Entry from '../Entry'

import outlander from 'js-outlander'

export default function Outlander ()
	/* :$Unit<$Entry<$Entry$File>, any, $Entry<$Entry$File>> */
{
	var linter = new Linter

	return Unit(entry =>
	{
		var content = entry.content.content

		var verf = linter.verifyAndFix(content, outlander)

		return Entry(entry.filename,
		{
			content: verf.output,
			sourcemap: entry.content.sourcemap,
		})
	})
}
