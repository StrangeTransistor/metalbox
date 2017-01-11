/* @flow */

var expect = require('chai').expect

var read = require('fs-sync').readJSON

var Frontend = require('../../../src/release/Frontend')

var src_rootpath = require('../../_/src-rootpath')
var dst_rootpath = require('../../_/dst-rootpath')
var tmp_rootpath = require('../../_/tmp-rootpath')

var Printer = require('../../../src/printer')
var ReleaseNotify = require('../../../src/notify/release-notify')

var compare = require('../../_/compare-release')

describe('Frontend (Prod)', () =>
{
	var src_root = src_rootpath('frontend')
	var dst_root = dst_rootpath('frontend')
	var tmp_root = tmp_rootpath()

	var tmp_env =
	{
		version: '1.0.0',

		src: src_root,
		dst: tmp_root,

		printer: Printer(process.stdout),
		notifier: ReleaseNotify(tmp_env),
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
