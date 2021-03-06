/* @flow */
/* :: import { $Rootpath } from '@streetstrider/rootpath' */

import { expect } from 'chai'

import Promise from 'bluebird'
var { delay } = Promise

import fs from 'fs-extra'

import tmp from 'src/rootpath/tmp'
import origin from 'src/rootpath/origin'
import collate from 'src/rootpath/collate'

import compare from 'src/compare'

import Entry   from 'src/Entry'
import Context from 'src/Context'

import Unit from 'src/Unit'

import Mutable from 'src/Unit/Entry/Mutable'
import Rebase  from 'src/Unit/Entry/Rebase'
import Content from 'src/Unit/Entry/Content'
import Load    from 'src/Unit/Entry/Load'
import File    from 'src/Unit/Entry/File'

import end from 'test/end'

import Watch from 'src/Unit/Watch'

describe('Watch', () =>
{
	var org = origin('glob')

	var globexpr = org('*.ext')
	var expected = [ '1.ext', '2.ext', '3.ext' ].sort()

	it('works', async () =>
	{
		var buffer = []

		var unit = Unit(({ filename }) =>
		{
			buffer.push(filename)
		})

		unit = Rebase(org(), '').pipe(unit)

		var watch = Watch(globexpr, unit)

		var result = watch(Context(null))

		end(result)

		await result.promise
		.then(() =>
		{
			expect(buffer.sort()).deep.eq(expected)
		})
	})

	it('single file', async () =>
	{
		var buffer = []

		var unit = Unit(({ filename }) =>
		{
			buffer.push(filename)
		})

		unit = Rebase(org(), '').pipe(unit)

		var watch = Watch(org('1.ext'), unit)

		var result = watch(Context(null))

		end(result)

		await result.promise
		.then(() =>
		{
			expect(buffer.sort()).deep.eq([ '1.ext' ])
		})
	})

	it('works inside composition', async () =>
	{
		var b1 = []
		var b2 = []

		var watch = Watch(globexpr, Unit(({ filename }) =>
		{
			return b1.push(org.relative(filename))
		}))

		var unit = watch.pipe(Unit((input) =>
		{
			return b2.push(input)
		}))

		var result = unit(Context(null))

		end(result)

		await result.promise
		.then(() =>
		{
			expect(b1.sort()).deep.eq(expected)
			expect(b2.sort()).deep.eq([ 1, 2, 3 ].sort())
		})
	})

	it('works with event types', async () =>
	{
		var b = []

		var tm = tmp()

		var unit = Unit(input =>
		{
			b.push(input)
		})
		unit = Rebase(tm(), '').pipe(unit)

		var watch = Watch(tm('*.ext'), unit)

		var result = watch(Context(null))

		await replay_mut(tm)

		end(result)

		await result.promise
		.then(() =>
		{
			expect(b).deep.eq(
			[
				{ filename: '1.ext', content: void 0 },
				{ filename: '2.ext', content: void 0 },
				{ filename: '3.ext', content: void 0 },
				{ filename: '2.ext', content: void 0 },
				{ filename: '1.ext', content: Entry.Remove },
			])
		})
	})

	it('streaming', async () =>
	{
		var tm = tmp()
		var tm_to = tmp()
		var cl = collate('watch/1')

		var watch = Watch(tm('*.ext'))
		var tr    = Content(content => content + '_baz')

		var payload = Load().pipe(tr)

		var unit = watch
		.pipe(Mutable(payload))
		.pipe(Rebase(tm(), tm_to()))
		.pipe(File())

		var result = unit(Context(null))

		await replay_mut(tm)

		end(result)

		await result.promise

		compare(cl(), tm_to())
	})

	it('streaming (ignore)', async () =>
	{
		var tm = tmp()
		var tm_to = tmp()
		var cl = collate('watch/2')

		var watch = Watch([ tm('*.ext'), tm('!2*') ])
		var tr    = Content(content => content + '_baz')

		var payload = Load().pipe(tr)

		var unit = watch
		.pipe(Mutable(payload))
		.pipe(Rebase(tm(), tm_to()))
		.pipe(File())

		var result = unit(Context(null))

		await replay_mut(tm)

		end(result)

		await result.promise

		compare(cl(), tm_to())
	})

	it('computable', async () =>
	{
		var tm = tmp()
		var tm_to = tmp()
		var cl = collate('watch/1')

		var watch = Watch(async () => tm('*.ext'))
		var tr    = Content(content => content + '_baz')

		var payload = Load().pipe(tr)

		var unit = watch
		.pipe(Mutable(payload))
		.pipe(Rebase(tm(), tm_to()))
		.pipe(File())

		var result = unit(Context(null))

		await replay_mut(tm)

		end(result)

		await result.promise

		compare(cl(), tm_to())
	})

	async function replay_mut (tm /* :$Rootpath */)
	{
		await fs.writeFile(tm('1.ext'), 'foo')
		await delay(100)
		await fs.writeFile(tm('2.ext'), 'foo')
		await delay(100)
		await fs.writeFile(tm('3.ext'), 'foo')
		await delay(100)
		await fs.writeFile(tm('3.ext.another'), 'another')
		await delay(100)
		await fs.writeFile(tm('2.ext'), 'bar')
		await delay(100)
		await fs.unlink(tm('1.ext'))
	}
})
