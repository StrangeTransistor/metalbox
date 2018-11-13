/* @flow */

var noop = () => {}

export default function alive /* ::<T> */ (r /* :$Result<T> */)
	/* :flyd$Stream<T> */
{
	r.promise.catch(noop)

	return r.stream
}
