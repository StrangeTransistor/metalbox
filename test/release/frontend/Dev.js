/* @flow */

var expect = require('chai').expect

var read = require('fs-sync').readJSON

var Frontend = require('../../../src/release/Frontend/Dev')

var src_rootpath = require('../../_/src-rootpath')
var dst_rootpath = require('../../_/dst-rootpath')
var tmp_rootpath = require('../../_/tmp-rootpath')

var compare = require('../../_/compare-release')

describe('Frontend (Dev)', () =>
{
	var src_root = src_rootpath('frontend')
	var dst_root = dst_rootpath('frontend-dev')
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
		.then(() =>
		{
			var release = read(tmp_root('release.json'))

			expect(release.version).eq('1.0.0')
		})
	})
})
