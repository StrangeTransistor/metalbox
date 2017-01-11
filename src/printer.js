/* @flow */

var NL = '\n'

var inspect = require('util').inspect
var indent  = require('indent-string')

module.exports = function Printer (output /* :stream$Writable */)
{
	var printer = {}

	printer.write = function write (line /* :string */)
	{
		output.write(line + NL)
	}

	printer.detail = function detail (object /* :any */)
	{
		var inspected = inspect(object, { colors: true })
		inspected = indent(inspected, 3)

		printer.write(inspected)
	}

	return printer
}
