/* @flow */

var assign = Object.assign

var defaults =
{
	tests: true,
}

module.exports = function smart_glob (options /* :?Object */) /* :string[] */
{
	options = assign({}, defaults, options)

	var glob = [ '**/*.js', '!flow-typed/**', '!coverage/**' ]

	if (! options.tests)
	{
		glob = glob.concat([ '!test/**', '!tests/**' ])
	}

	return glob
}
