
var bold = require('cli-color').bold

module.exports = (dst, tmp) =>
{
	var r = require('dir-compare').compareSync(dst, tmp,
	{
		compareSize: true,
		compareContent: true,
		excludeFilter: 'release.json'
	})

	if (r.same)
	{
		console.log(`   ${bold('tmp:')} ${tmp}`)

		return true
	}
	else
	{
		var differences = r.differences
		var diff = r.diffSet.filter(it => it.state !== 'equal')

		console.warn('release differs: %s files differences', differences)
		console.warn(diff)
		console.log(bold(` $ meld ${tmp} ${dst}`))

		return false
	}
}
