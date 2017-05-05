/* @flow */

var assign = Object.assign

var expect = require('chai').expect

var read = require('fs-sync').readJSON

/* ::

type Options =
{
	instance?: boolean,
	hash?: boolean
};

*/

module.exports = (path /* :string */, options /* ::?:Options */) =>
{
	options = assign({}, options)

	var release = read(path)

	expect(release).an('object')
	expect(release.version).eq('0.0.0')
	expect(release.timestamp).a('string')

	if (options.instance)
	{
		expect(release.instance).a('string')
		expect(release.name).a('string')
	}

	if (options.hash)
	{
		expect(release.hash).a('string')
		expect(release.hash).eq('fixed')
	}

	expect(release.git).an('object')
	expect(release.git.rev).a('string')
	expect(release.git.msg).a('string')
	expect(release.git.timestamp).a('string')
	expect(release.git.author).a('string')
}
