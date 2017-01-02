/* @flow */

var expect = require('chai').expect
var isDir = require('fs-sync').isDir

var Composite = require('../../src/artifact/Composite')
var Directory = require('../../src/artifact/Directory')
var Artifact  = require('../../src/artifact/Artifact')

var tmp_rootpath = require('../_/tmp-rootpath')

describe('Composite', () =>
{
	var tmp_root = tmp_rootpath()
	var tmp_env =
	{
		dst: tmp_root
	}

	it('works', () =>
	{
		var d1 = Directory('test1')
		var d2 = Directory('test2')

		var d_test = Artifact(() =>
		{
			expect(isDir(tmp_root('test1'))).true
			expect(isDir(tmp_root('test2'))).false
		})

		var r = Composite([ d1, d_test, d2 ])

		return r
		.construct(tmp_env)
		.then(() =>
		{
			expect(isDir(tmp_root('test1'))).true
			expect(isDir(tmp_root('test2'))).true
		})
	})

	it('throws', () =>
	{
		var d1 = Directory('test3')
		var d2 = Directory('test4')

		var d_throw = Artifact(() =>
		{
			throw new Error
		})

		var r = Composite([ d1, d_throw, d2 ])

		return r
		.construct(tmp_env)
		.then(() =>
		{
			expect(0, 'must throw').eq(1)
		},
		() =>
		{
			expect(isDir(tmp_root('test3'))).true
			expect(isDir(tmp_root('test4'))).false
		})
	})
})
