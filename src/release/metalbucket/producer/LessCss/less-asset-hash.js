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

				var data = subst_data(value)

				if (data)
				{
					/* inlined value */
					value = data
				}
				else
				{
					/* check for other cases (~assets) */
					value = subst_tilde(value)
				}

				url.value.value = value
				return url
			}

			pluginManager.addVisitor(asset_visitor)
		}
	}

	function subst_data (url)
	{
		var filename = resolve(url)

		if (filename)
		{
			return inline(filename)
		}
		else
		{
			return null
		}
	}
}
