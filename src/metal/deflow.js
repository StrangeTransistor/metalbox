/* @flow */

import flow from 'rollup-plugin-sucrase'

export default function deflow ()
{
	return flow(
	{
		transforms: [ 'flow' ],
	})
}
