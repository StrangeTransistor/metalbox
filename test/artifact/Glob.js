/* @flow */

var basename = require('path').basename

var expect = require('chai').expect

var Fn   = require('../../src/artifact/Glob/Fn')
var GlobCopy = require('../../src/artifact/Glob/Copy')
var Glob = require('../../src/artifact/Glob/Glob')

var File = require('../../src/artifact/File')
var Copy = require('../../src/artifact/Copy')

var src_rootpath = require('../_/src-rootpath')
var dst_rootpath = require('../_/dst-rootpath')
var tmp_rootpath = require('../_/tmp-rootpath')

var compare = require('../_/compare-release')

var src_root = src_rootpath('frontend')

describe('Glob (fn)', () =>
{
	it('works', () =>
	{
		var r = []

		var g = Fn('', '**/*.@(jpg|png|gif)', '', (src, path, dst, env) =>
		{
			expect_rootpath(src)
			expect_rootpath(dst)

			expect(env).an('object')

			expect_rootpath(env.src)
			expect_rootpath(env.dst)

			r.push(path)
		})

		var tmp_env =
		{
			src: src_root,
			dst: tmp_rootpath()
		}

		return g.construct(tmp_env)
		.then(() =>
		{
			expect(r).deep.eq(
			[
				'buckets/index/green-large.png',
				'buckets/index/green.png',
				'buckets/other-bucket/green.gif'
			])
		})
	})

	function expect_rootpath (r)
	{
		expect(r).a('function')
		expect(r.path).a('string')
	}


	it('works with fs', () =>
	{
		var dst_root = dst_rootpath('static-only')
		var tmp_root = tmp_rootpath()

		var tmp_env =
		{
			src: src_root,
			dst: tmp_root
		}

		var g = GlobCopy('buckets', '**/*.@(jpg|png|gif)', '')

		return g.construct(tmp_env)
		.then(() =>
		{
			expect(compare(dst_root(), tmp_root())).ok
		})
	})
})

describe('Glob', () =>
{
	it('works', () =>
	{
		var dst_root = dst_rootpath('file-regular-content')
		var tmp_root = tmp_rootpath()

		var tmp_env =
		{
			src: src_root,
			dst: tmp_root
		}

		var f = File((env /* :EnvEntry */) =>
		{
			return env.entry
		},
		(env /* :EnvEntry */) =>
		{
			return basename(env.entry, '.js')
		})

		var g = Glob('buckets', '**/*.js', '', f)

		return g.construct(tmp_env)
		.then(() =>
		{
			expect(compare(dst_root(), tmp_root())).ok
		})
	})

	it('works with alterated src(), dst()', () =>
	{
		var dst_root = dst_rootpath('file-regular-content-offset')
		var tmp_root = tmp_rootpath()

		var tmp_env =
		{
			src: src_root,
			dst: tmp_root
		}

		var f = File((env /* :EnvInOut & EnvEntry */) =>
		{
			return env.dst(env.entry)
		},
		(env /* :EnvEntry */) =>
		{
			return basename(env.entry, '.js')
		})

		var g = Glob('buckets', '**/*.js', 'buckets-transformed', f)

		return g.construct(tmp_env)
		.then(() =>
		{
			expect(compare(dst_root(), tmp_root())).ok
		})
	})

	it('works with Copy()', () =>
	{
		var dst_root = dst_rootpath('static-only')
		var tmp_root = tmp_rootpath()

		var tmp_env =
		{
			src: src_root,
			dst: tmp_root
		}

		var g = Glob('buckets', '**/*.@(jpg|png|gif)', '', Copy())

		return g.construct(tmp_env)
		.then(() =>
		{
			expect(compare(dst_root(), tmp_root())).ok
		})
	})
})
