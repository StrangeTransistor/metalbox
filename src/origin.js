/* @flow */

import rootpath from '@streetstrider/rootpath'

export default function origin (name /* :string */)
{
	return rootpath(__dirname, '..', 'test/origin', name)
}
