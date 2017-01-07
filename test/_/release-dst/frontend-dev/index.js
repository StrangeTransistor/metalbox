(function () {
'use strict';

var arrow3 = () => 3;

var some = "value";
var other_json = {
	some: some
};

var throttle = function( fn, timing=200 ) {

    var timer;

    return function(...args) {

        if(!timer) {
            timer = setTimeout( e => { fn.apply( this, args ); timer=false; }, timing);
        }

    };

};

// bucket:index

0 && console.log('index');

var arrow1 = () => 1;

0 && console.log([ 1, 2, 3 ].map(arrow1));

0 && console.log([ 1, 2, 3 ].map(arrow3));

var other_mod = throttle(other_mod);
0 && other_mod(other_json);

}());
