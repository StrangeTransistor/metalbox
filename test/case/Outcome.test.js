/* @flow */

import Promise from 'bluebird'
var resolve = Promise.resolve
var delay   = Promise.delay

import { stream } from 'flyd'

import { expect } from 'chai'

import { concat } from 'src/flyd/drain'

import Context from 'src/Context'
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

		/* @flow-off */
		var buffer = concat(outcome.stream)
		var output = outcome.output

		s(1)
		s(2)
		s(3)

		s.end(true)

		expect(await output).eq(3)
		expect(await buffer).deep.eq([ 1, 2, 3 ])
	})

	it('captures stream error', async () =>
	{
		var s = stream()
		var outcome = Outcome(s)
		var error = new Error('e')

		/* @flow-off */
		var buffer = concat(outcome.stream)

		var output = outcome.output.then(
		()  => expect(false).true,
		(e) => e)

		s(1)
		s(error)
		s(new Error('not'))
		s(2)
		s(3)
		s(new Error('that'))

		expect(await output).eq(error)
		expect(await buffer).deep.eq([ 1, error ])
	})

	it('Outcome.invoke', async () =>
	{
		var outcome = Outcome.invoke(input => input, Context(17))

		expect(outcome).property('stream')
		expect(outcome).property('output')

		var output = await outcome.output

		expect(output).eq(17)
	})

	it('Outcome.invoke captures throw', async () =>
	{
		var error = new Error('e')

		var outcome = Outcome.invoke(() =>
		{
			throw error
		}
		, Context(null))

		var r = await outcome.output.then(
		()  => expect(false).true,
		(e) => e)

		expect(r).eq(error)
	})

	it('Outcome timing', async () =>
	{
		var outcome_never = Outcome(new Promise(() => {}))

		expect_hrtime(outcome_never.time.start)
		expect(outcome_never.time.stop).eq(null)
		expect(outcome_never.time.taken).eq(null)

		var outcome = Outcome(delay(25))

		await outcome.output

		var time = outcome.time

		expect_hrtime(time.start)

		/* @flow-off */
		expect_hrtime((time.stop  /* :$Hrtime */))
		/* @flow-off */
		expect_hrtime((time.taken /* :$Hrtime */))

		/* @flow-off */
		expect(time.taken[0]).eq(0)
		/* @flow-off */
		expect(time.taken[1] > 25e6).true
		/* @flow-off */
		expect(time.taken[1] < 30e6).true


		function expect_hrtime (time /* :$Hrtime */)
		{
			expect(time).an('array')
			expect(time.length).eq(2)
			expect(time[0]).a('number')
			expect(time[1]).a('number')
		}
	})
})
