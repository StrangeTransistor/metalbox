/* @flow */

import sucrase from 'rollup-plugin-sucrase'

export default function dets ()
{
	return sucrase(
	{
		transforms: [ 'typescript' ]
	})
}
