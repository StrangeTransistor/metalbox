/* @flow */

module.exports = function Pug ()
{
	return function (env /* :EnvFrontend */)
		/* :{ pretty: boolean, dev: boolean, basedir: string } */
	{
		return {
			pretty: false,
			dev: env.dev || false,
			basedir: env.src(env.buckets_path)
		}
	}
}
