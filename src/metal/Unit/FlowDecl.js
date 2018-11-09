/* @flow */

import Rename from '../../Unit/Entry/Rename'

export default function FlowDecl ()
{
	return Rename/* :: <any, any> */(filename => filename + '.flow')
}
