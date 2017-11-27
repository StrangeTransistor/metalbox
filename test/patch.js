
{
	let { resolve } = require('path')
	process.env.NODE_PATH = resolve(__dirname, '..')
}

{
	let chai = require('chai')
	let chai_promise = require('chai-as-promised')
	chai.use(chai_promise)
}
