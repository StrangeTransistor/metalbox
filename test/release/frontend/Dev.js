/* @flow */

var expect = require('chai').expect

var all   = require('bluebird').all
var delay = require('bluebird').delay

var Frontend = require('../../../src/release/Frontend/Dev')

var src_rootpath = require('../../_/src-rootpath')
var dst_rootpath = require('../../_/dst-rootpath')
var tmp_rootpath = require('../../_/tmp-rootpath')

var Printer = require('../../../src/printer')
var ReleaseNotify = require('../../../src/notify/release-notify')

var compare = require('../../_/compare-release')
var expect_release = require('../../_/expect-release')

describe('Frontend (Dev)', () =>
{
	var src_root = src_rootpath('frontend')
	var dst_root = dst_rootpath('frontend-dev')
	var tmp_root = tmp_rootpath()

	var tmp_env =
	{
		version: '1.0.0',

		src: src_root,
		dst: tmp_root,

		printer: Printer(process.stdout),
		notifier: ReleaseNotify(tmp_env),

		is_esc: false,
	}

	var f = Frontend()

	it('works', () =>
	{
		var p_construct = f.construct(tmp_env)
		.then(() =>
		{
			console.log('   ', tmp_root())

			expect(compare(dst_root(), tmp_root())).ok
		})
		.then(() =>
		{
			expect_release(tmp_root('release.json'))
		})

		var p_delay = delay(1000)
		.then(() =>
		{
			return f.disengage()
		})

		return all([ p_construct, p_delay ])
	})
})
