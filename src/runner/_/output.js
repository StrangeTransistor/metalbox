/* @flow */

var bold = require('cli-color').bold

module.exports =
(
	printer   /* :T_Printer */,
	task_name /* :string */,
	promise   /* :Bluebird$Promise<*> */
) =>
{
	return promise.then(() =>
	{
		printer.write(`${bold('OK:')} ${task_name}`)
	},
	error =>
	{
		printer.write(`${bold.red('ERROR:')} ${error.message}`)
		printer.detail(error)
	})
}
