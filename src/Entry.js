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

Entry.Remove = /* ::( */ Symbol('Remove') /* :$Entry$Remove) */
