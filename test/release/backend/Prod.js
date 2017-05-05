/* @flow */

var expect = require('chai').expect

var Backend = require('../../../src/release/Backend')

var src_rootpath = require('../../_/src-rootpath')
var dst_rootpath = require('../../_/dst-rootpath')
var tmp_rootpath = require('../../_/tmp-rootpath')

var tmp_env = require('../../_/tmp-env')

var compare = require('../../_/compare-release')
var expect_release = require('../../_/expect-release')

describe('Backend (Prod)', () =>
{
	var src_root = src_rootpath('backend')
	var dst_root = dst_rootpath('backend')
	var tmp_root = tmp_rootpath()

	var env = tmp_env(src_root, tmp_root)

	var b = Backend()

	it('works', () =>
	{
		return b.construct(env)
		.then(() =>
		{
			expect(compare(dst_root(), tmp_root())).ok
		})
		.then(() =>
		{
			expect_release(tmp_root('release.json'), { instance: true })
		})
	})
})
