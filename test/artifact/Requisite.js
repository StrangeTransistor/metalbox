/* @flow */

var expect = require('chai').expect
var isDir = require('fs-sync').isDir

var Requisite = require('../../src/artifact/Requisite')
var Directory = require('../../src/artifact/Directory')

var tmp_rootpath = require('../_/tmp-rootpath')

describe('Requisite', () =>
{
	var tmp_root = tmp_rootpath()
	var tmp_env =
	{
		rootpath: tmp_root
	}

	it('works', () =>
	{
		var d = Directory('test')
		var r = Requisite(() => {}, d)

		return r
		.construct(tmp_env)
		.then(() =>
		{
			expect(isDir(tmp_root('test'))).true
		})
	})

	it('throws', () =>
	{
		var d = Directory('test_no')
		var r = Requisite(() =>
		{
			throw new Error('no_req')
		}
		, d)

		return r
		.construct(tmp_env)
		.then(() =>
		{
			expect(0, 'must throw').eq(1)
		},
		e =>
		{
			expect(e).an('error')
			expect(e.message).eq('no_req')

			expect(isDir(tmp_root('test_no'))).false
		})
	})
})
