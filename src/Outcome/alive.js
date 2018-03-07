/* @flow */

import alive from '../flyd/alive'

export default function /* ::<$value> */
(
	outcome /* :$Outcome<$value> */
)
	/* :flyd$Stream<$value> */
{
	return alive(outcome.stream || outcome.output)
}
