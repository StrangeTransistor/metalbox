/* @flow */

var expect = require('chai').expect

var Backend = require('../../../src/release/Backend')

var src_rootpath = require('../../_/src-rootpath')
var dst_rootpath = require('../../_/dst-rootpath')
var tmp_rootpath = require('../../_/tmp-rootpath')

var Printer = require('../../../src/printer')

var compare = require('../../_/compare-release')
var expect_release = require('../../_/expect-release')

describe('Backend', () =>
{
	var src_root = src_rootpath('backend')
	var dst_root = dst_rootpath('backend')
	var tmp_root = tmp_rootpath()

	var tmp_env =
	{
		version: '1.0.0',

		src: src_root,
		dst: tmp_root,

		printer: Printer(process.stdout),
	}

	var b = Backend()

	it('works', () =>
	{
		return b.construct(tmp_env)
		.then(() =>
		{
			console.log('   ', tmp_root())

			expect(compare(dst_root(), tmp_root())).ok
		})
		.then(() =>
		{
			expect_release(tmp_root('release.json'))
		})
	})
})
