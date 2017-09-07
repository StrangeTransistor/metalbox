/* @flow */

var assign = Object.assign

var defaults =
{
	tests: true,
	ts: false,
}

module.exports = function smart_glob (options /* :?Object */) /* :string[] */
{
	options = assign({}, defaults, options)

	var glob = []

	if (! options.ts)
	{
		glob.push('**/*.js')
	}
	else
	{
		glob.push('**/*.ts')
	}

	glob = glob.concat([ '!flow-typed/**', '!coverage/**' ])

	if (! options.tests)
	{
		glob = glob.concat([ '!test/**', '!tests/**' ])
	}

	return glob
}
