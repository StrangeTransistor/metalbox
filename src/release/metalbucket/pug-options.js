/* @flow */

module.exports = function (env /* :EnvFrontend */)
{
	return {
		pretty: false,
		dev: env.dev || false,
		basedir: env.src(env.buckets_path)
	}
}
