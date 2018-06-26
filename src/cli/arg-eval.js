/* @flow */

export default function (string /* :string */) /* :any */
{
	try
	{
		return eval(`(${ string })`)
	}
	catch (e)
	{
		return string
	}
}
