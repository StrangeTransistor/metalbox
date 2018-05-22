/* @flow */

var assign = Object.assign

import { inspect } from 'util'

import tcomb from 'tcomb'

import invoke from './_/invoke'

import Pipe from './compose/Pipe'
import Precursor from './compose/Precursor'
import Fork from './compose/Fork'

import random_family from './_/random-family'

/* ::

type $Options<$in, $prov: $Providers$Base, $out>
= $Unit$Fn<$in, $prov, $out>
| $Unit$Options$Maybe<$in, $prov, $out>

declare function Unit <$in, $prov: $Providers$Base, $out>
(fn: $Unit$Fn<$in, $prov, $out>)
: $Unit<$in, $prov, $out>

declare function Unit <$in, $prov: $Providers$Base, $out>
(options: $Unit$Options$Maybe<$in, $prov, $out>)
: $Unit<$in, $prov, $out>

*/

var defaults =
{
	input: tcomb.Any,
}

export default function Unit /* ::<$in, $prov: $Providers$Base, $out> */
(
	options /* :$Options<$in, $prov, $out> */
)
	/* :$Unit<$in, $prov, $out> */
{
	if (typeof options === 'function')
	{
		options = { unit: options }
	}

	options = assign({}, defaults, options)

	/* main */
	var unit = function (context)
	{
		return invoke(options.unit, context, options.input)
	}

	if (options.family)
	{
		unit.family = options.family
	}
	else
	{
		unit.family = random_family()
	}

	unit[inspect.custom] = function inspect ()
	{
		return { family: unit.family }
	}

	/* Pipe, Pre, Fork as methods */
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
