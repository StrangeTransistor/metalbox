/* @flow */
/* ::

// import type { InputOptions  as $Rollup$InputOptions }  from 'rollup'
import type { OutputOptions as $Rollup$OutputOptions } from 'rollup'

import type { Bundle  as $Rollup$Bundle }  from 'rollup'
import type { Format  as $Rollup$Format }  from 'rollup'
import type { Exports as $Rollup$Exports } from 'rollup'

*/

var assign = Object.assign

import { rollup } from 'rollup'

import unroll from '../../unroll'
import Entry from '../../Entry'
import Unit from '../Unit'

export default function Rollup /* ::<$in, $prov: $Providers$Base> */
(
	input   /* :$Computable<$in, $prov, string> */,
	options /* :: ?:$Shape<$Rollup$Options> */
)
	/* :$Unit<$in, $prov, $Entry<$Rollup$Bundle>> */
{
	return Unit(async (_, context) =>
	{
		var Σinput   = await unroll(context, input)
		var Σoptions = assign({}, options,
		{
			input: Σinput
		})

		if (Σoptions.external === true)
		{
			Σoptions.external = externalize(Σinput)
		}

		var bundle = await rollup(Σoptions)

		return Entry(Σinput, bundle)
	})
}

function externalize (input)
{
	return (entry) => input !== entry
}

Rollup.Entry = function (options /* :: ?:$Shape<$Rollup$Options> */)
{
	return Rollup(
		(entry /* :$Entry<any> */) => entry.filename,
		options
	)
}

export function Generate
(
	format  /* :$Rollup$Format  */,
	exports /* :$Rollup$Exports */,
	options /* :: ?:$Shape<$Rollup$OutputOptions> */
)
	/* :$Unit<$Entry<$Rollup$Bundle>, any, $Entry<$Entry$File>> */
{
	return Unit(async (entry) =>
	{
		var bundle /* :$Rollup$Bundle */ = entry.content

		var Σoptions = assign({}, options,
		{
			format,
			exports,
		})

		var codepair = await bundle.generate(Σoptions)

		return Entry(entry.filename,
		{
			content:   codepair.code,
			sourcemap: codepair.map
		})
	})
}

export function Cjs ()
{
	return Generate('cjs', 'auto')
}

export function Es6 ()
{
	return Generate('es', 'auto')
}

export function Iife ()
{
	return Generate('iife', 'none')
}
