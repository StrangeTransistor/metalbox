/* @flow */

var expect = require('chai').expect

var Copy = require('../../src/artifact/Copy/Single')
var Composite = require('../../src/artifact/Composite')
var Directory = require('../../src/artifact/Directory')

var src_rootpath = require('../_/src-rootpath')
var dst_rootpath = require('../_/dst-rootpath')
var tmp_rootpath = require('../_/tmp-rootpath')

var compare = require('../_/compare-release')

describe('Copy', () =>
{
	var src_root = src_rootpath('frontend')
	var dst_root = dst_rootpath('copy')
	var tmp_root = tmp_rootpath()

	var tmp_env =
	{
		src: src_root,
		dst: tmp_root
	}

	var copy = Copy('package.json')
	var copy_alt = Copy('buckets/index/index.pug', 'index.pug')

	it('works', () =>
	{
		var r = Composite(
		[
			Directory(),
			copy,
			copy_alt,
		])

		return r
		.construct(tmp_env)
		.then(() =>
		{
			expect(compare(dst_root(), tmp_root())).ok
		})
	})
})
