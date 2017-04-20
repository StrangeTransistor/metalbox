/* @flow */

var mkdir = require('mkdirp').sync

var expect = require('chai').expect

var cmd_metalbox = require('../_/cmd-metalbox')

var dst_rootpath = require('../_/dst-rootpath')
var tmp_rootpath = require('../_/tmp-rootpath')

var compare = require('../_/compare-release')

describe('runner template', () =>
{
	it('works', () =>
	{
		var dst_root = dst_rootpath('template-frontend')
		var tmp_root = tmp_rootpath()

		mkdir(tmp_root())
		process.chdir(tmp_root())

		return cmd_metalbox('template template/Frontend')
		.then(() =>
		{
			expect(compare(dst_root(), tmp_root())).ok
		})
	})
})
