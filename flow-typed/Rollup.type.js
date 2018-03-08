/**
 * Special case of `rollup.InputOptions`
**/

/*::

import { InputOptions } from 'rollup'

*/

type $Rollup$Options = InputOptions
&
{
	external?: boolean,
	silent?: boolean,
}
