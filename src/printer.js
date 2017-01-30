/* @flow */

var NL = '\n'

var inspect = require('util').inspect
var indent  = require('indent-string')

/* ::

export type T_Printer =
{
	write:  (line: string) => void,
	detail: (object: any)  => void
};

*/

module.exports = function Printer (output /* :stream$Writable */)
	/* :T_Printer */
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
