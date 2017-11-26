/* @flow */

export default function Entry
(
	filename /* :string */,
	content  /* :string */
)
	/* :$Entry */
{
	var entry =
	{
		filename,
		content,
		sourcemap: null,
	}

	return entry
}
