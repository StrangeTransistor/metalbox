/* @flow */

var expect = require('chai').expect

var load = require('fs-sync').readJSON

var all   = require('bluebird').all
var delay = require('bluebird').delay

var Backend = require('../../../src/release/Backend/Dev')

var src_rootpath = require('../../_/src-rootpath')
var dst_rootpath = require('../../_/dst-rootpath')
var tmp_rootpath = require('../../_/tmp-rootpath')

var Printer = require('../../../src/printer')
var ReleaseNotify = require('../../../src/notify/release-notify')

var compare = require('../../_/compare-release')
var expect_release = require('../../_/expect-release')

describe('Backend (Dev)', () =>
{
	var src_root = src_rootpath('backend')
	var dst_root = dst_rootpath('backend')
	var tmp_root = tmp_rootpath()

	var tmp_env =
	{
		package: load(src_root('package.json')),

		src: src_root,
		dst: tmp_root,

		printer: Printer(process.stdout),
		notifier: ReleaseNotify(tmp_env),

		once: true,
	}

	var b = Backend()

	it('works', () =>
	{
		var p_construct = b.construct(tmp_env)
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
			return b.disengage()
		})

		return all([ p_construct, p_delay ])
	})
})
