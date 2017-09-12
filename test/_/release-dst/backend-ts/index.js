'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var bar = _interopDefault(require('./mod'));
var mod2 = _interopDefault(require('./mod2'));
require('typescript-helpers');

/*

tsc --pretty --noemit --allowjs --checkjs --strict test/_/release-src/ts/index.ts

*/
function foo(s) {
    console.log(s);
}
foo('abc');
foo(String(bar(1)));
foo(mod2(2));
console.log(bar(3));
