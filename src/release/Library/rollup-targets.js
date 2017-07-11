/* @flow */

var target_default = 'jsnext-first'

var target_aliases =
{
	'jsnext-first':
	[
		[ 'jsnext', './' ],
		[ 'node',   'dist/' ],
	],
	'node-first':
	[
		[ 'node',   './' ],
		[ 'jsnext', 'jsnext/' ],
	],
	'node-only':
	[
		[ 'node',   './' ],
	],
	'jsnext-only':
	[
		[ 'jsnext', './' ],
	],
}

module.exports = function from_targets (env /* :Object */)
{
	var target = target_default

	if (env.options && env.options.targets)
	{
		target = env.options.targets
	}

	if (typeof target === 'string')
	{
		if (target in target_aliases)
		{
			target = target_aliases[target]
		}
		else
		{
			throw new TypeError(`unknown target alias ${target}`)
		}
	}

	return target
}
