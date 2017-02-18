
function foo (this: void, s: string)
{
	console.log(s)
}

foo('abc')
foo(1)
