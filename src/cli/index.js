/* @flow */
/* :: import type { minimistOutput } from 'minimist' */

import runner from './runner'

var index = runner(
{
	help: () => { console.log('print help') },
	version: () => { console.log('print version') },
}
, () => { console.log('print default') })

export default function (mini /* :minimistOutput */)
{
	return index(mini)
}
