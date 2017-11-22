/* @flow */

export default function Context /* :: <$in> */
(
	input /* :$in */
)
	/* :$Context<$in> */
{
	var context =
	{
		input,

		first: true,
		once: false,
		live: false,

		engine:  {},
		storage: {},
	}

	return context
}
