
import bar from './mod.ts'

function foo (this: void, s: string)
{
	console.log(s)
}

foo('abc')
foo(bar(1))
console.log(bar(2))
