/* @flow */

var notify = require('./notify')

module.exports = function ReleaseNotify ()
	/* :T_ReleaseNotify */
{
	var notifier = {}

	notifier.notify = notify

	return notifier
}
