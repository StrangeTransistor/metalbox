/* @flow */

import rootpath from '@streetstrider/rootpath'

export default function tmp (name /* :string */)
{
	return rootpath(__dirname, '..', 'test/collate', name)
}
