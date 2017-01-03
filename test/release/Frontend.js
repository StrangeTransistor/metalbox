/* @flow */

var expect = require('chai').expect

var Frontend = require('../../src/release/Frontend')

var in_rootpath  = require('../_/in-rootpath')
var dst_rootpath = require('../_/dst-rootpath')
var tmp_rootpath = require('../_/tmp-rootpath')

var compare = require('dir-compare').compareSync

describe('Frontend', () =>
{
	var in_root  = in_rootpath('frontend')
	var dst_root = dst_rootpath('frontend')
	var tmp_root = tmp_rootpath()

	var tmp_env =
	{
		src: in_root,
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

			expect(compare(dst_root(), tmp_root()).same).ok
		})
	})
})
