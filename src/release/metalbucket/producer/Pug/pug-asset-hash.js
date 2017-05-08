/* @flow */
/* ::

type Asset =
{
	(url: string): string,
	url (url: string): string,
}

*/

var flow = require('lodash').flow

var Asset_url = require('../../asset-url')

module.exports = (env /* :EnvFrontend */) =>
{
	/* @flow-off */
	var hash = env.hash

	var asset_url = Asset_url(hash)

	function asset_static (url /* :string */)
	{
		return url.replace(re_asset(), '$1' + '.' + hash + '.' + '$2')
	}

	/* @flow-off */
	var asset /* :Asset */

	if (hash)
	{
		asset = flow(asset_url, asset_static)
	}
	else
	{
		asset = asset_url
	}


	/* @flow-off */
	asset.url = (url /* :string */) =>
	{
		return `url(${ asset(url) })`
	}

	return asset
}

var re_asset = () => /^([^./]+)\.([^.]+)$/
