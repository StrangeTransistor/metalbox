/* @flow */

var expect = require('chai').expect

var all   = require('bluebird').all
var delay = require('bluebird').delay

var Backend = require('../../../src/release/Backend/Dev')

var src_rootpath = require('../../_/src-rootpath')
var dst_rootpath = require('../../_/dst-rootpath')
var tmp_rootpath = require('../../_/tmp-rootpath')

var tmp_env = require('../../_/tmp-env')

var compare = require('../../_/compare-release')
var expect_release = require('../../_/expect-release')

describe('Backend (Dev)', () =>
{
	var src_root = src_rootpath('backend')
	var dst_root = dst_rootpath('backend-dev')
	var tmp_root = tmp_rootpath()

	var env = tmp_env(src_root, tmp_root, { notify: true })

	/* @flow-off */
	env.once = true

	var b = Backend()

	it('works', () =>
	{
		var p_construct = b.construct(env)
		.then(() =>
		{
			expect(compare(dst_root(), tmp_root())).ok
		})
		.then(() =>
		{
			expect_release(tmp_root('release.json'), true)
		})

		var p_delay = delay(1000)
		.then(() =>
		{
			return b.disengage()
		})

		return all([ p_construct, p_delay ])
	})
})
