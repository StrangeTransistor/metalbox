/* @flow */

var expect = require('chai').expect

var Frontend = require('../../../src/release/Frontend')

var src_rootpath = require('../../_/src-rootpath')
var dst_rootpath = require('../../_/dst-rootpath')
var tmp_rootpath = require('../../_/tmp-rootpath')

var tmp_env = require('../../_/tmp-env')

var compare = require('../../_/compare-release')
var expect_release = require('../../_/expect-release')

describe('Frontend (Prod)', () =>
{
	it('works', function ()
	{
		this.timeout(5000)

		var src_root = src_rootpath('frontend')
		var dst_root = dst_rootpath('frontend')
		var tmp_root = tmp_rootpath()

		var env = tmp_env(src_root, tmp_root, { notify: true })

		/* @flow-off */
		env.hash = 'fixed'

		var f = Frontend()

		return f.construct(env)
		.then(() =>
		{
			expect(compare(dst_root(), tmp_root())).ok
		})
		.then(() =>
		{
			expect_release(tmp_root('release.json'), { hash: true })
		})
	})

	it('works in TS-mode', function ()
	{
		this.timeout(5000)

		var src_root = src_rootpath('frontend-ts')
		var dst_root = dst_rootpath('frontend-ts')
		var tmp_root = tmp_rootpath()

		var env = tmp_env(src_root, tmp_root, { notify: true })

		env.hash = 'fixed'

		// TODO fix rollup-plugin-typescript bug
		var cwd = process.cwd()
		process.chdir(src_root())

		var f = Frontend()

		return f.construct(env)
		.then(() =>
		{
			expect(compare(dst_root(), tmp_root())).ok
		})
		.then(() =>
		{
			expect_release(tmp_root('release.json'), { hash: true })
		})
		.finally(() =>
		{
			// TODO rm
			process.chdir(cwd)
		})
	})
})
