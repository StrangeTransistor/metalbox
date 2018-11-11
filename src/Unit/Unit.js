/* @flow */

var assign = Object.assign

import { inspect } from 'util'

import tcomb from '../tcomb'

import Result from '../Result'

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
	input:  tcomb.Any,
	family: null,
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

	var Σoptions /* :$Unit$Options<$in, $prov, $out> */
	= assign({}, defaults, options)

	/* main */
	var unit = function (context)
	{
		return Result(Σoptions.unit, context, Σoptions)
	}

	if (Σoptions.family)
	{
		unit.family = Σoptions.family
	}
	else
	{
		unit.family = random_family()
	}

	/* @flow-off */
	unit[kind] = null

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

Unit.is = (unit /* :any */) =>
{
	/* @flow-off */
	return (kind in unit)
}

var kind = Symbol('Unit')
