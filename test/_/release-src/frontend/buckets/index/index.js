/* @flow */
// bucket:index

0 && console.log('index')

var arrow1 = () => 1

// eslint-disable-next-line no-unused-vars
var arrow2 = () => 2

0 && console.log([ 1, 2, 3 ].map(arrow1))

import { arrow3 } from './mod'

0 && console.log([ 1, 2, 3 ].map(arrow3))

import other_json from 'other-bucket/other.json'
import other_mod  from 'other-bucket/other-mod'

import throttle from 'es6y-throttle'

var other_mod_thr = throttle(other_mod)
0 && other_mod_thr(other_json)

function lower (it: string): string
{
	return it.toLowerCase()
}
