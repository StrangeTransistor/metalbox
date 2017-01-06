(function () {
'use strict';

var arrow3 = () => 3;

// bucket:index

0 && console.log('index');

var arrow1 = () => 1;

0 && console.log([ 1, 2, 3 ].map(arrow1));

0 && console.log([ 1, 2, 3 ].map(arrow3));

}());
