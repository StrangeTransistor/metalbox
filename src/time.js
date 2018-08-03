/* @flow */
/* ::

type $Time = [] | [[ number, number ]]

*/

export default function time (...v /* :$Time */)
{
	return process.hrtime(...v)
}
