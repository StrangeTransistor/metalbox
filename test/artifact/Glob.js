/* @flow */

var expect = require('chai').expect

var Glob = require('../../src/artifact/Glob')

var src_rootpath = require('../_/src-rootpath')
var tmp_rootpath = require('../_/tmp-rootpath')

describe('Glob', () =>
{
	var src_root = src_rootpath('frontend')
	var tmp_root = tmp_rootpath()

	var tmp_env =
	{
		src: src_root,
		dst: tmp_root
	}

	var r = []

	var g = Glob('', '**/*.@(jpg|png|gif)', '', (src, path, dst, env) =>
	{
		expect_rootpath(src)
		expect_rootpath(dst)

		expect(env).an('object')

		expect_rootpath(env.src)
		expect_rootpath(env.dst)

		r.push(path)
	})

	it('works', () =>
	{
		return g.construct(tmp_env)
		.then(() =>
		{
			expect(r).deep.eq(
			[
				'buckets/index/empty.png',
				'buckets/other-bucket/empty.gif'
			])
		})
	})

	function expect_rootpath (r)
	{
		expect(r).a('function')
		expect(r.path).a('string')
	}
})
