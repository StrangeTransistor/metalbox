/* @flow */

var asset_url = require('../../asset-url')

module.exports = (env /* :EnvFrontend */) =>
{
	var hash = env.hash

	var subst_tilde = asset_url(hash)

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

				value = subst_tilde(value, hash)

				url.value.value = value
				return url
			}

			pluginManager.addVisitor(asset_visitor)
		}
	}
}
