/* @flow */

import { stream } from 'flyd'

export default function Unit ()
{
	return () => stream(1)
}
