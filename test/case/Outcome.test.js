/* @flow */

import Promise from 'bluebird'
var resolve = Promise.resolve

import { stream } from 'flyd'

import { expect } from 'chai'

import Outcome from 'src/Outcome'

describe('Outcome', () =>
{
	it('captures plain value', async () =>
	{
		var v = 17
		var outcome = Outcome(v)

		expect(outcome).property('stream')
		expect(outcome.stream).null

		expect(outcome).property('output')

		var output = await outcome.output

		expect(output).eq(v)
	})

	it('captures Promise', async () =>
	{
		var v = 17
		var outcome = Outcome(resolve(v))

		expect(outcome).property('stream')
		expect(outcome.stream).null

		expect(outcome).property('output')

		var output = await outcome.output

		expect(output).eq(v)
	})

	it('captures stream', async () =>
	{
		var s = stream()
		var outcome = Outcome(s)

		expect(outcome).property('stream')
		expect(outcome).property('output')

		var buffer = []

		/* @flow-off */
		outcome.stream.map(v => buffer.push(v))

		s(1)
		s(2)
		s(3)

		s.end(true)

		var output = await outcome.output

		expect(output).eq(3)
		expect(buffer).deep.eq([ 1, 2, 3 ])
	})
})
