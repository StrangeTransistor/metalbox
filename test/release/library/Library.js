/* @flow */

var expect = require('chai').expect

var Library = require('../../../src/release/Library')

var src_rootpath = require('../../_/src-rootpath')
var dst_rootpath = require('../../_/dst-rootpath')
var tmp_rootpath = require('../../_/tmp-rootpath')

var tmp_env = require('../../_/tmp-env')

var compare = require('../../_/compare-release')
var expect_release = require('../../_/expect-release')

describe('Library', () =>
{
	it('works with jsnext-first', () =>
	{
		return test_library('jsnext-first', 'library', 'library')
	})

	it('works with node-first', () =>
	{
		return test_library('node-first', 'library', 'library-node-first')
	})

	it('works with node-only', () =>
	{
		return test_library('node-only', 'library', 'library-node-only')
	})

	it('works with jsnext-only', () =>
	{
		return test_library('jsnext-only', 'library', 'library-jsnext-only')
	})

	it('works with special targets', () =>
	{
		var mode =
		[
			[ 'node',   'a/b' ],
			[ 'jsnext', 'x/y' ],
		]

		return test_library(mode, 'library', 'library-special')
	})

	it('works in TS mode', () =>
	{
		return test_library('node-first', 'ts', 'library-ts')
	})

	function test_library (mode, src = 'library', dst = 'library')
	{
		var src_root = src_rootpath(src)
		var dst_root = dst_rootpath(dst)
		var tmp_root = tmp_rootpath()

		var env = tmp_env(src_root, tmp_root)

		/* @flow-off */
		env.options = { targets: mode }

		var rl = Library()

		return rl.construct(env)
		.then(() =>
		{
			expect(compare(dst_root(), tmp_root())).ok
		})
		.then(() =>
		{
			expect_release(tmp_root('release.json'))
		})
	}
})
