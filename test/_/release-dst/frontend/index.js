(function () {
'use strict';

// bucket:index

console.log('index');

var arrow1 = () => 1;

console.log([ 1, 2, 3 ].map(arrow1));

}());
