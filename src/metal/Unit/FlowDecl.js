/* @flow */

import Rename from '../../Unit/Entry/Rename'

export default function FlowDecl ()
{
	return Rename(filename => filename + '.flow')
}
