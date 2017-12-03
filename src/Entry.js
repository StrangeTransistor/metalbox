/* @flow */

export default function Entry /* ::<$content> */
(
	filename /* :string */,
	content  /* :$content */
)
	/* :$Entry<$content> */
{
	return {
		filename,
		content,
	}
}
