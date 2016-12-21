/* @flow */

var Bluebird = require('bluebird')

var Artifact = require('./src/artifact/Artifact')

var a1 = Artifact(() => console.log(1))
var a2 = Artifact(() => { console.log(2); return Promise.resolve() })
var a3 = Artifact(() => { console.log(3); return Bluebird.resolve() })


var Composite = require('./src/artifact/Composite')

var c = Composite([ a1, a2, a3 ])

c.construct().then(it => console.log('r', it))
