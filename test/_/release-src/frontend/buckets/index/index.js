/* @flow */
// bucket:index

import metalbox from '@metalbox'

function so () { return 1 - 1 }

so() && console.log(metalbox.dev)

so() && console.log('index')

var arrow1 = () => 1

var arrow2 = () => 2

so() && console.log([ 1, 2, 3 ].map(arrow1))

import { arrow3, method } from './mod'

so() && console.log([ 1, 2, 3 ].map(arrow3))
so() && console.log([ 4, 5, 6 ].map(method))

import arrow4 from './re-mod2'

so() && arrow4()

import other_json from 'other-bucket/other.json'
import other_mod  from 'other-bucket/other-mod'

import throttle from 'es6y-throttle'

var other_mod_thr = throttle(other_mod)
so() && other_mod_thr(other_json)

function lower (it: string): string
{
	return it.toLowerCase()
}

so() && lower('ABC')

import template from 'templates/template.pug'
import template_static from 'templates/template.static.pug'

so() && console.log(template(
{
	data: 'data'
}))

so() && console.log(template_static)
