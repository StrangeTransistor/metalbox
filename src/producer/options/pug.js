/* @flow */

module.exports = function Pug (env /* :EnvFrontend */)
	/* :{ pretty: boolean, dev: boolean, basedir: string } */
{
	return {
		pretty: false,
		dev: env.dev || false,
		basedir: env.src(env.buckets_path)
	}
}
