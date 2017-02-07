/* @flow */

var expect = require('chai').expect

var read = require('fs-sync').readJSON

module.exports = (path /* :string */) =>
{
	var release = read(path)

	expect(release).an('object')
	expect(release.version).eq('0.0.0')
	expect(release.timestamp).a('string')

	expect(release.instance).a('string')
	expect(release.name).a('string')

	expect(release.git).an('object')
	expect(release.git.rev).a('string')
	expect(release.git.msg).a('string')
	expect(release.git.timestamp).a('string')
	expect(release.git.author).a('string')
}
