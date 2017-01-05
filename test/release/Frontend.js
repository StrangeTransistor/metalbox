/* @flow */

var expect = require('chai').expect

var Frontend = require('../../src/release/Frontend')

var src_rootpath = require('../_/src-rootpath')
var dst_rootpath = require('../_/dst-rootpath')
var tmp_rootpath = require('../_/tmp-rootpath')

var compare = (v1, v2) =>
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
		console.warn(r)
		return false
	}
}

describe('Frontend', () =>
{
	var src_root = src_rootpath('frontend')
	var dst_root = dst_rootpath('frontend')
	var tmp_root = tmp_rootpath()

	var tmp_env =
	{
		src: src_root,
		dst: tmp_root,

		version: '1.0.0'
	}

	var f = Frontend()

	it('works', () =>
	{
		return f.construct(tmp_env)
		.then(() =>
		{
			console.log('   ', tmp_root())

			expect(compare(dst_root(), tmp_root())).ok
		})
	})
})
