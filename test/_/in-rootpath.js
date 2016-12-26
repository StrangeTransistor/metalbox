/* @flow */

var Rootpath = require('rootpath')

module.exports = (name /* :string */) =>
{
	return Rootpath(__dirname, 'release-src', name)
}
