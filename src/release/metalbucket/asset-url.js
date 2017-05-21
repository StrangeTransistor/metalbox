/* @flow */

var resolve = require('./resolve-resource')
var re_asset = resolve.re

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
		return url.replace(re_asset(), 'assets-' + hash + '/' + '$1')
	}
}

function subst_plain ()
{
	return (url /* :string */) =>
	{
		return url.replace(re_asset(), 'assets/' + '$1')
	}
}
