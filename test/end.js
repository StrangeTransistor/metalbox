/* @flow */

import Promise from 'bluebird'

var { delay } = Promise

export default function end (result /* :$Result<any> */)
{
	return delay(200).then(() => result.stream.end(true))
}
