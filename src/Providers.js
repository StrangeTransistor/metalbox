/* @flow */

export default function Providers ()
{
	var prov = {}

	var providers =
	{
		reg (name /* :string */, service /* :any */)
		{
			prov[name] = service
		},

		dep (name /* :string */)
		{
			return prov[name]
		},
	}

	return providers
}
