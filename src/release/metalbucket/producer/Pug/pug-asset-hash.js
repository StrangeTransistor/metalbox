/* @flow */
/* ::

type Asset =
{
	(url: string): string,
	url (url: string): string,
};

*/

var flow = require('lodash').flow

var asset_url = require('../../asset-url')

module.exports = (env /* :EnvFrontend */) =>
{
	/* @flow-off */
	var hash = env.hash

	var subst_tilde = asset_url(hash)

	function asset_static (url /* :string */)
	{
		return url.replace(re_asset(), '$1' + '.' + hash + '.' + '$2')
	}

	var asset /* :Asset */

	if (hash)
	{
		asset = (flow(subst_tilde, asset_static) /* :Asset */)
	}
	else
	{
		/* @flow-off */
		asset = (subst_tilde /*:Asset */)
	}


	/* @flow-off */
	asset.url = (url /* :string */) =>
	{
		return `url(${ asset(url) })`
	}

	return asset
}

var re_asset = () => /^([^./]+)\.([^.]+)$/
