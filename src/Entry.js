/* @flow */

export default function Entry
(
	options /* :$Entry$Optional */
)
	/* :$Entry */
{
	var entry =
	{
		filename:  options.filename,
		content:   options.content,
		sourcemap: options.sourcemap || null,
	}

	return entry
}
