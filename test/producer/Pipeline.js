/* @flow */

var expect = require('chai').expect

var resolve = require('bluebird').resolve

var Pipeline = require('../../src/producer/Pipeline')

describe('Frontend', () =>
{
	var P /* :Producer<*, string> */ = () =>
	{
		return resolve('abc')
	}

	var upper /* :T_Pipe<string, string, *> */ = (input) =>
	{
		return input.toUpperCase()
	}

	var split /* :T_Pipe<string, Array<string>, *> */ = (input) =>
	{
		return input.split('')
	}

	it('works', () =>
	{
		var p = Pipeline(P, upper, split)

		return p()
		.then(it =>
		{
			expect(it).eql([ 'A', 'B', 'C' ])
		})
	})
})
