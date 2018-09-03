/* @flow */
/* :: import type { minimistOutput } from 'minimist' */

import resolve from '../unit/resolve'
import make    from '../unit/make'
import invoke  from '../unit/invoke'

export default async function (mini /* :minimistOutput */)
{
	var recipe = resolve(mini)
	var unit = await make(mini, recipe)
	return await invoke(mini, unit)
}
