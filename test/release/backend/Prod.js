/* @flow */

// var expect = require('chai').expect

// var read = require('fs-sync').readJSON

var Backend = require('../../../src/release/Backend')

var src_rootpath = require('../../_/src-rootpath')
// var dst_rootpath = require('../../_/dst-rootpath')
var tmp_rootpath = require('../../_/tmp-rootpath')

var Printer = require('../../../src/printer')
// var ReleaseNotify = require('../../../src/notify/release-notify')

// var compare = require('../../_/compare-release')

describe('Backend', () =>
{
	var src_root = src_rootpath('backend')
	// var dst_root = dst_rootpath('frontend')
	var tmp_root = tmp_rootpath()

	var tmp_env =
	{
		version: '1.0.0',

		src: src_root,
		dst: tmp_root,

		printer: Printer(process.stdout),
		// notifier: ReleaseNotify(tmp_env),
	}

	var b = Backend()

	it('works', () =>
	{
		return b.construct(tmp_env)
	})
})
