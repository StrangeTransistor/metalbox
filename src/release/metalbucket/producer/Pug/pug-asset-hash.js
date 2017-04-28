/* @flow */

module.exports = (env /* :EnvFrontend */) =>
{
	/* @flow-off */
	var hash = env.hash

	return (url /* :string */) =>
	{
		return url.replace(re_asset_subst(), '$1' + '.' + hash + '.' + '$2')
	}
}

var re_asset_subst = () => /^(.+)\.([^.]+)$/
