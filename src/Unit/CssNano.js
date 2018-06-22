/* @flow */

import cssnano from 'cssnano'

import Postcss  from './Postcss'

export default function CssNano ()
{
	return Postcss(
	[
		cssnano(
		{
			safe: true,
		})
	])
}
