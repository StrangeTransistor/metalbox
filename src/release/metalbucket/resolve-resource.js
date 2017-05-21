/* @flow */

var resolve = module.exports = function resolver (env /* :EnvFrontend */)
{
	return (value /* :string */) =>
	{
		var match = value.match(resolve.re())

		if (match)
		{
			return env.src(env.buckets_path, match[1])
		}
		else
		{
			return null
		}
	}
}

resolve.re = () => /^~assets\/(.*)$/
