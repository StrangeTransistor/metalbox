(function (once) {
	'use strict';

	once = once && once.hasOwnProperty('default') ? once['default'] : once;

	function mod ()
	{
		return 'mod'
	}

	var mod1 = once(() =>
	{
		return 'mod1'
	});

	function main ()
	{
		console.log('main', mod());
		console.log('main', mod1());
	}

	main();

}(once));
