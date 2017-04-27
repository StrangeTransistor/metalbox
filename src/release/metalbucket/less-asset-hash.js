/* @flow */

module.exports =
{
	install: (less /* :any */, pluginManager /* :any */) =>
	{
		/*
		less.functions.functionRegistry.add('asset-hash', (filename) =>
		{
			console.log(filename)
			return filename
		})
		*/

		var v = {}

		var visitor = new less.visitors.Visitor(v)

		v.run = (root) =>
		{
			visitor.visit(root)
		}

		// TODO
		var hash = 'abcdef'

		v.visitUrl = (url) =>
		{
			var value = url.value.value
			if (re_asset().test(value))
			{
				value = subst(value, hash)
			}

			url.value.value = value
			return url
		}

		pluginManager.addVisitor(v)
	}
}

var re_asset = () => /^~assets\//
var re_asset_subst = () => /^~assets\/(.*)$/

function subst (url, hash)
{
	return url.replace(re_asset_subst(), 'assets-' + hash + '/' + '$1')
}
