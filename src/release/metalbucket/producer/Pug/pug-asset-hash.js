/* @flow */

module.exports = (url /* :string */) =>
{
	// TODO
	var hash = 'abcdef'

	return url.replace(re_asset_subst(), '$1' + '.' + hash + '.' + '$2')
}

var re_asset_subst = () => /^(.+)\.([^.]+)$/
