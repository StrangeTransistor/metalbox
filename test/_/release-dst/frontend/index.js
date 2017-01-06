(function () {
'use strict';

var arrow3 = () => 3;

var some = "value";
var other_json = {
	some: some
};

var other_mod = () =>
{
	console.log('other mod');
};

// bucket:index

0 && console.log('index');

var arrow1 = () => 1;

0 && console.log([ 1, 2, 3 ].map(arrow1));

0 && console.log([ 1, 2, 3 ].map(arrow3));

0 && other_mod(other_json);

}());
