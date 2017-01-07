
module.exports = (v1, v2) =>
{
	var r = require('dir-compare').compareSync(v1, v2,
	{
		compareSize: true,
		compareContent: true,
		excludeFilter: 'release.json'
	})

	if (r.same)
	{
		return true
	}
	else
	{
		var differences = r.differences
		var diff = r.diffSet.filter(it => it.state !== 'equal')

		console.warn('release differs: %s files differences', differences)
		console.warn(diff)

		return false
	}
}
