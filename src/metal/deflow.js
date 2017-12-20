/* @flow */

import flow from 'rollup-plugin-flow'

export default function deflow ()
{
	return flow(
	{
		pretty: true,
	})
}
