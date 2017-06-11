/* @flow */

var resolve = require('./resolve-resource')
var re_asset = resolve.re

var asset_dir = require('./asset-dir')

module.exports = function asset_url (hash /* :?string */)
{
	if (hash)
	{
		return subst_hash(hash)
	}
	else
	{
		return subst_plain()
	}
}

function subst_hash (hash /* :string */)
{
	return (url /* :string */) =>
	{
		return url.replace(re_asset(), asset_dir(hash) + '/' + '$1')
	}
}

function subst_plain ()
{
	return (url /* :string */) =>
	{
		return url.replace(re_asset(), asset_dir() + '/' + '$1')
	}
}
