/* @flow */

var mkdir = require('mkdirp').sync

// var write = require('fs-sync').write
// var load  = require('fs-sync').readJSON

var expect = require('chai').expect

var cmd   = require('command-promise')

var dst_rootpath = require('../_/dst-rootpath')
var tmp_rootpath = require('../_/tmp-rootpath')

var compare = require('../_/compare-release')
// var expect_release = require('../_/expect-release')

describe('runner template', () =>
{
	it('works', () =>
	{
		var dst_root = dst_rootpath('template-frontend')
		var tmp_root = tmp_rootpath()

		mkdir(tmp_root())
		process.chdir(tmp_root())

		// write(tmp_root('package.json'), '{ "name": "name" }')

		return cmd('node',
			__dirname + '/../../run/metalbox', 'template template/Frontend')
		.then(() =>
		{
			expect(compare(dst_root(), tmp_root())).ok
		})
	})
})
