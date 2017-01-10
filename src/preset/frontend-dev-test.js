
var Preset = require('../artifact/Preset')

var Frontend = require('../release/Frontend/Dev')

var src_rootpath = require('../../test/_/src-rootpath')
var tmp_rootpath = require('../../test/_/tmp-rootpath')

var preset = Preset(() =>
{
	var src_root = src_rootpath('frontend')
	var tmp_root = tmp_rootpath()

	var env =
	{
		version: '1.0.0',

		src: src_root,
		dst: tmp_root
	}

	return env
}
, Frontend())

preset
.then(release =>
{
	return release.construct()
})
