/* @flow */

var assign = Object.assign

var defaults =
{
	tests: true,
}

module.exports = function smart_glob (options /* :?Object */) /* :string[] */
{
	options = assign({}, defaults, options)

	var r = [ '**/*.js', '!flow-typed/**', '!coverage/**' ]

	if (! options.tests)
	{
		r = r.concat([ '!test/**', '!tests/**' ])
	}

	return r
}
