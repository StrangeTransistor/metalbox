/* @flow */
/* ::

type $Entries<$content> = Array<$Entry<$content>>

type $Glob$Glob = string | string[]

type $Glob$Options = Object

*/

var assign = Object.assign

import { find } from 'globule'

import bluebird from 'bluebird'
var map = bluebird.mapSeries

import unroll from '../unroll'

import Entry from '../Entry'
import Context from '../Context'

import Unit from './Unit'

export default function Glob /* ::<$in, $prov: $Providers$Base, $out> */
(
	glob /* :$Computable<$in, $prov, $Glob$Glob> */,
	unit /* :$Unit<$Entries<void>, $prov, $out> */,
	options /* :: ?:$Shape<$Glob$Options> */
)
	/* :$Unit<$in, $prov, $out> */
{
	options = assign({}, options)

	return Unit(async (_, context) =>
	{
		var Σglob = await unroll(context, glob)
		Σglob = [].concat(Σglob)

		var found = find(Σglob, options)
		var entries = found.map(filename => Entry(filename))

		var outcome = await unit(Context(entries))
		return outcome.output
	})
}

Glob.Each = function /* ::<$in, $prov: $Providers$Base, $out> */
(
	glob /* :$Computable<$in, $prov, $Glob$Glob> */,
	unit /* :$Unit<$Entry<void>, $prov, $out> */,
	options /* :: ?:$Shape<$Glob$Options> */
)
	/* :$Unit<$in, $prov, [ $out ]> */
{
	var each = Unit(async (entries) =>
	{
		var contexts =  entries.map(entry => Context(entry))
		var outcomes =    await map(contexts, unit)

		return outcomes.map(it => it.output)
	})

	return Glob(glob, each, options)
}
