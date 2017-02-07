/* @flow */

var expect = require('chai').expect

var load = require('fs-sync').readJSON

var Library = require('../../../src/release/Library')

var src_rootpath = require('../../_/src-rootpath')
var dst_rootpath = require('../../_/dst-rootpath')
var tmp_rootpath = require('../../_/tmp-rootpath')

var Printer = require('../../../src/printer')

var compare = require('../../_/compare-release')
var expect_release = require('../../_/expect-release')

describe('Library', () =>
{
	var src_root = src_rootpath('library')
	var dst_root = dst_rootpath('library')
	var tmp_root = tmp_rootpath()

	var tmp_env =
	{
		package: load(src_root('package.json')),

		instance: 'battle',

		src: src_root,
		dst: tmp_root,

		printer: Printer(process.stdout),
	}

	var rl = Library()

	it('works', () =>
	{
		return rl.construct(tmp_env)
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
