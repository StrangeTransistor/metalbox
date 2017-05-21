/* @flow */

var asset_url = require('../../asset-url')
var resolver = require('../../resolve-resource')
var inline = require('../../inline-asset')

module.exports = (env /* :EnvFrontend */) =>
{
	var hash = env.hash

	var subst_tilde = asset_url(hash)
	var resolve = resolver(env)

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

				var filename = resolve(value)
				console.log('F', filename)

				if (filename)
				{
					var data = inline(filename)
					console.log(data)
				}

				value = subst_tilde(value, hash)

				url.value.value = value
				return url
			}

			pluginManager.addVisitor(asset_visitor)
		}
	}
}
