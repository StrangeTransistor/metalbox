/* @flow */

var mkdir = require('mkdirp').sync

var write = require('fs-sync').write
var load  = require('fs-sync').readJSON

var expect = require('chai').expect

var cmd_metalbox = require('../_/cmd-metalbox')

var tmp_rootpath = require('../_/tmp-rootpath')

describe('runner run', () =>
{
	it('works', () =>
	{
		var tmp_root = tmp_rootpath()

		mkdir(tmp_root())
		process.chdir(tmp_root())

		write(tmp_root('package.json'), '{ "name": "name" }')

		return cmd_metalbox('run Backend')
		.then(() =>
		{
			var manifest = load(tmp_root('release/Backend/package.json'))

			expect(manifest).deep.eq({ name: 'name' })

			var release = load(tmp_root('release/Backend/release.json'))

			expect(release.git).eq(null)
			expect(release.instance).eq('battle')
			expect(release.name).eq('name-battle')
		})
	})
})
