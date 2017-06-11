/* @flow */

module.exports = function asset_dir (hash /* :?string */)
{
	if (hash)
	{
		return 'assets-' + hash
	}
	else
	{
		return 'assets'
	}
}
