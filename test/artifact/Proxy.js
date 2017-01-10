/* @flow */

var expect = require('chai').expect

var resolve = require('bluebird').resolve

var Artifact = require('../../src/artifact/Artifact')
var Proxy = require('../../src/artifact/Proxy')

describe('Proxy', () =>
{
	it('works', () =>
	{
		var side = 0
		var disg = false


		var a = Artifact(env =>
		{
			side = side + env.inc
		})

		a.describe = () => '[A]'

		a.disengage = () =>
		{
			disg = true

			return resolve()
		}


		var proxy = Proxy(a, construct =>
		{
			return (env) =>
			{
				var p_env = Object.assign({}, env, { inc: 2 })

				return construct(p_env)
				.then(() =>
				{
					side = -side
				})
			}
		})

		expect(proxy).an('object')
		expect(proxy).property('construct')
		expect(proxy.construct).a('function')
		expect(proxy.disengage).a('function')
		expect(proxy.describe).a('function')

		return proxy.construct({ inc: 1 })
		.then(r =>
		{
			expect(r).an('undefined')
			expect(side).eq(-2)
		})
		.then(() =>
		{
			expect(proxy.describe()).eq('[Proxy to [A]]')
		})
		.then(() =>
		{
			expect(disg).false
			return proxy.disengage()
		})
		.then(() =>
		{
			expect(disg).true
		})
	})
})
