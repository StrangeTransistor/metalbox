/* @flow */

import sucrase from 'rollup-plugin-sucrase'

export default function deflow ()
{
	return sucrase(
	{
		transforms: [ 'flow' ],
	})
}
