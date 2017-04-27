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

		v.visitUrl = (url, args) =>
		{
			console.log(url)
			console.log(args)
			return url
		}

		pluginManager.addVisitor(v)
	}
}
