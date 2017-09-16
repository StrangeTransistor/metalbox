/*

tsc --pretty --noemit --allowjs --checkjs --strict test/_/release-src/ts/index.ts

*/

import bar  from './mod'
import mod2 from './mod2'

function foo (this: void, s: string)
{
	console.log(s)
}

foo('abc')
foo(String(bar(1)))
foo(mod2(2))
console.log(bar(3))


function over (n: number): number;
function over (n: string): number;
function over (n: any): any
{
	return Number(n)
}

console.log(over(1))
console.log(over('1'))
