/* @flow */

var expect = require('chai').expect
var isDir = require('fs-sync').isDir

var Directory = require('../../src/artifact/Directory')

var tmp_rootpath = require('../_/tmp-rootpath')

describe('Directory', () =>
{
	var tmp_root = tmp_rootpath()
	var tmp_env =
	{
		out: tmp_root
	}

	it('works', () =>
	{
		return Directory('test')
		.construct(tmp_env)
		.then(() =>
		{
			expect(isDir(tmp_root('test'))).true
		})
	})

	it('works if already exists', () =>
	{
		var d = Directory('test')
		return d
		.construct(tmp_env)
		.then(() =>
		{
			return d.construct(tmp_env)
		})
		.then(() =>
		{
			expect(isDir(tmp_root('test'))).true
		})
	})
})
