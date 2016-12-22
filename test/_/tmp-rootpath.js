
var tmpdir = require('os').tmpdir
var randomstring = require('randomstring').generate

var Rootpath = require('rootpath')

module.exports = () =>
{
	return Rootpath(tmpdir(), 'metalbox-test', randomstring(8))
}
