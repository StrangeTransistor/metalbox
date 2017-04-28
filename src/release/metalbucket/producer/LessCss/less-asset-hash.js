/* @flow */

module.exports = (env /* :EnvFrontend */) =>
{
	/* @flow-off */
	var hash = env.hash

	return {
		install: (less /* :any */, pluginManager /* :any */) =>
		{
			var asset_visitor = {}

			var visitor = new less.visitors.Visitor(asset_visitor)

			asset_visitor.run = (root) =>
			{
				visitor.visit(root)
			}

			asset_visitor.visitUrl = (url) =>
			{
				var value = url.value.value
				if (re_asset().test(value))
				{
					value = subst(value, hash)
				}

				url.value.value = value
				return url
			}

			pluginManager.addVisitor(asset_visitor)
		}
	}
}

var re_asset = () => /^~assets\//
var re_asset_subst = () => /^~assets\/(.*)$/

function subst (url, hash)
{
	return url.replace(re_asset_subst(), 'assets-' + hash + '/' + '$1')
}
