/* @flow */

var NL = '\n'

module.exports = function Printer (output /* :stream$Writable */)
{
	var printer = {}

	printer.write = function write (line /* :string */)
	{
		output.write(line + NL)
	}

	return printer
}
