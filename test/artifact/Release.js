/* @flow */

var expect = require('chai').expect
var isDir  = require('fs-sync').isDir
var isFile = require('fs-sync').isFile
var read   = require('fs-sync').read

var File = require('../../src/artifact/File')
var Directory = require('../../src/artifact/Directory')

var Release = require('../../src/artifact/Release')

var src_rootpath = require('../_/src-rootpath')
var tmp_rootpath = require('../_/tmp-rootpath')

describe('Release', () =>
{
	var src_root = src_rootpath('empty')
	var tmp_root = tmp_rootpath()

	var tmp_env =
	{
		src: src_root,
		dst: tmp_root
	}

	it('works', () =>
	{
		var r = Release(
		[
			Directory('test'),
			File('test/file', () => 'ABC')
		])

		return r
		.construct(tmp_env)
		.then(() =>
		{
			expect(isDir(tmp_root('test'))).true
			expect(isFile(tmp_root('test/file'))).true

			var content = read(tmp_root('test/file'))

			expect(content).eq('ABC')
		})
	})
})
