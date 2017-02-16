/* @flow */

var expect = require('chai').expect

var isFile = require('fs-sync').isFile
var read   = require('fs-sync').read

var File = require('../../src/artifact/File')

var tmp_rootpath = require('../_/tmp-rootpath')

describe('File', () =>
{
	var tmp_root = tmp_rootpath()
	var tmp_env =
	{
		dst: tmp_root
	}

	it('works', () =>
	{
		return File('test', () =>
		{
			return 'ABC'
		})
		.construct(tmp_env)
		.then(() =>
		{
			expect(isFile(tmp_root('test'))).true

			var content = read(tmp_root('test'))

			expect(content).eq('ABC')
		})
	})

	it('works with promise', () =>
	{
		return File('test', () =>
		{
			return Promise.resolve('DEF')
		})
		.construct(tmp_env)
		.then(() =>
		{
			expect(isFile(tmp_root('test'))).true

			var content = read(tmp_root('test'))

			expect(content).eq('DEF')
		})
	})

	it('works with prod_ filename and env', () =>
	{
		var $tmp_env = Object.assign({}, tmp_env, { entry: 'test_smth' })

		return File((env) => env.entry, () =>
		{
			return Promise.resolve('XYZ')
		})
		.construct($tmp_env)
		.then(() =>
		{
			expect(isFile(tmp_root('test_smth'))).true

			var content = read(tmp_root('test_smth'))

			expect(content).eq('XYZ')
		})
	})
})
