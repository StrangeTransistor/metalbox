/* @flow */

var expect = require('chai').expect

var all   = require('bluebird').all
var delay = require('bluebird').delay

var Library = require('../../../src/release/Library/Dev')

var src_rootpath = require('../../_/src-rootpath')
var dst_rootpath = require('../../_/dst-rootpath')
var tmp_rootpath = require('../../_/tmp-rootpath')

var tmp_env = require('../../_/tmp-env')

var compare = require('../../_/compare-release')
var expect_release = require('../../_/expect-release')

describe('Library (Dev)', () =>
{
	var src_root = src_rootpath('library')
	var dst_root = dst_rootpath('library')
	var tmp_root = tmp_rootpath()

	var env = tmp_env(src_root, tmp_root)

	/* @flow-off */
	env.once = true

	var rl = Library()

	it('works', () =>
	{
		var p_construct = rl.construct(env)
		.then(() =>
		{
			expect(compare(dst_root(), tmp_root())).ok
		})
		.then(() =>
		{
			expect_release(tmp_root('release.json'))
		})

		var p_delay = delay(1000)
		.then(() =>
		{
			return rl.disengage()
		})

		return all([ p_construct, p_delay ])
	})
})
