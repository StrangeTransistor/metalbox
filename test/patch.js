
{
	let { resolve } = require('path')
	process.env.NODE_PATH = resolve(__dirname, '..')
	// eslint-disable-next-line no-underscore-dangle
	require('module')._initPaths()
}

{
	let chai = require('chai')
	let chai_promise = require('chai-as-promised')
	chai.use(chai_promise)
}
