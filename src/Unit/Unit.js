/* @flow */

import bluebird from 'bluebird'
var method = bluebird.method

import Outcome from '../Outcome'

import Pipe from './compose/Pipe'
import Precursor from './compose/Precursor'
import Fork from './compose/Fork'

export default function Unit /* ::<$in, $prov: $Providers$Base, $out> */
(
	fn /* :$Unit$Fn<$in, $prov, $out> */
)
	/* :$Unit<$in, $prov, $out> */
{
	var Σfn = method(fn)

	var unit = function (context)
	{
		return Outcome(Σfn(context.input, context))
	}

	unit.pipe = function pipe /* ::<$out_next> */
	(
		next /* :$Unit<$out, $prov, $out_next> */
	)
		/* :$Unit<$in, $prov, $out_next> */
	{
		return Pipe(unit, next)
	}

	unit.pre = function pre /* ::<$out_next> */
	(
		next /* :$Unit<$in, $prov, $out_next> */
	)
		/* :$Unit<$in, $prov, $out_next> */
	{
		return Precursor(unit, next)
	}

	unit.fork = function fork /* ::<$out_side> */
	(
		side /* :$Unit<$in, $prov, $out_side> */
	)
		/* :$Unit<$in, $prov, [ $out, $out_side ]> */
	{
		return Fork(unit, side)
	}

	return unit
}
