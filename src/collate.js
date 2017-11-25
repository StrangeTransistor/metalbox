/* @flow */

import rootpath from '@streetstrider/rootpath'

export default function collate (name /* :string */)
{
	return rootpath(__dirname, '..', 'test/collate', name)
}
