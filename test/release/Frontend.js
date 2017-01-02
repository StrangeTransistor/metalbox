/* @flow */

// var expect = require('chai').expect
// var isDir  = require('fs-sync').isDir
// var isFile = require('fs-sync').isFile
// var read   = require('fs-sync').read

// var File = require('../../src/artifact/File')
// var Directory = require('../../src/artifact/Directory')

var Frontend = require('../../src/release/Frontend')

var in_rootpath  = require('../_/in-rootpath')
var tmp_rootpath = require('../_/tmp-rootpath')

describe('Frontend', () =>
{
	var in_root  = in_rootpath('frontend')
	var tmp_root = tmp_rootpath()

	console.log(tmp_root())

	var tmp_env =
	{
		src: in_root,
		dst: tmp_root,

		version: '1.0.0'
	}

	var f = Frontend()

	it('works', () =>
	{
		return f.construct(tmp_env)
	})
})
