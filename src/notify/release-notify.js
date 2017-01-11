/* @flow */

var empty = require('is-empty')
var resolve = require('bluebird').resolve

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


	var obstacles = {}

	notifier.obstacle = function obstacle (subsystem, error)
	{
		if (error)
		{
			obstacles[subsystem] = true

			return notifier.nag(subsystem, error)
		}
		else
		{
			if (empty(obstacles))
			{
				return resolve()
			}

			delete obstacles[subsystem]

			if (empty(obstacles))
			{
				return notifier.notify('OK')
			}
			else
			{
				return resolve()
			}
		}
	}

	return notifier
}
