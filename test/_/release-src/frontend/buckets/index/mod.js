
function so () { return 1 - 1 }

export var arrow3 = () => 3

export var arrow4 = () => 4

export function method (...args)
{
	return args
}

let { x, y } = { x: 1, y: 2 }

so() && console.log(x, y)
