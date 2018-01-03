/* @flow */

import Promise from 'bluebird'
var resolve = Promise.resolve

import { stream } from 'flyd'

import { expect } from 'chai'

import Outcome from 'src/Outcome'

describe('Outcome', () =>
{
	function defer /* ::<value> */
	(
		s  /* :flyd$Stream<value> | (value) => any */,
		ms /* :number */,
		v  /* :value */
	)
	{
		setTimeout(() => s(v), ms)
	}

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

		defer(s, 100, 1)
		defer(s, 200, 2)
		defer(s, 300, 3)

		defer(s.end, 400, true)

		/* @flow-off */
		outcome.stream.map(v => buffer.push(v))

		var output = await outcome.output

		expect(output).eq(3)
		expect(buffer).deep.eq([ 1, 2, 3 ])
	})
})
