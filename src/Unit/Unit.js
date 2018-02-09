/* @flow */

import { inspect } from 'util'

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
	var unit = function (context)
	{
		return Outcome.invoke(fn, context)
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

	unit[inspect.custom] = function inspect ()
	{
		return { family: unit.family }
	}

	unit.family = Name()

	return unit
}


import { generate as random } from 'randomstring'
import pad from 'lodash/padStart'

var n = 1
var opts = { length: 3, capitalization: 'uppercase' }
function Name ()
{
	return `${ pad(String(n++), 3, '0') }.${ random(opts) }`
}
