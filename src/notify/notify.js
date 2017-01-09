/* @flow */
/* ::

type Notification =
{
	title:   string,
	message: string
};

*/

var notifier  = require('node-notifier')
var promisify = require('bluebird').promisify

var p_notify = promisify(notifier.notify, { context: notifier })

module.exports = function notify (notification /* :Notification*/)
	/* :Product<void> */
{
	return p_notify(notification)
}
