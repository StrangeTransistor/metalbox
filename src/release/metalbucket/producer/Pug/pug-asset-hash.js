/* @flow */

var Asset_url = require('../../asset-url')

module.exports = (env /* :EnvFrontend */) =>
{
	/* @flow-off */
	var hash = env.hash

	var asset

	if (hash)
	{
		asset = (url /* :string */) =>
		{
			return url.replace(re_asset(), '$1' + '.' + hash + '.' + '$2')
		}
	}
	else
	{
		asset = (url /* :string */) =>
		{
			return url
		}
	}


	var asset_url = Asset_url(hash)

	asset.url = (url /* :string */) =>
	{
		return `url(${ asset_url(url) })`
	}

	return asset
}

var re_asset = () => /^(.+)\.([^.]+)$/
