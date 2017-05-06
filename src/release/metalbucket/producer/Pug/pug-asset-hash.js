/* @flow */

module.exports = (env /* :EnvFrontend */) =>
{
	/* @flow-off */
	var hash = env.hash

	if (hash)
	{
		return (url /* :string */) =>
		{
			return url.replace(re_asset(), '$1' + '.' + hash + '.' + '$2')
		}
	}
	else
	{
		return (url /* :string */) =>
		{
			return url
		}
	}
}

var re_asset = () => /^(.+)\.([^.]+)$/
