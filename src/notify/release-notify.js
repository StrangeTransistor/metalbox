/* @flow */

var $notify = require('./notify')

module.exports = function ReleaseNotify ()
	/* :T_ReleaseNotify */
{
	var notifier = {}

	notifier.notify = function notify
	(
		message /* : string */,
		title   /* :?string */
	)
	{
		if (title)
		{
			title = 'metalbox — ' + title
		}
		else
		{
			title = 'metalbox'
		}

		return $notify({ title: title, message: message })
	}

	notifier.nag = function nag (subsystem, error)
	{
		return notifier.notify(subsystem + ': ' + error, 'Error')
	}

	return notifier
}
