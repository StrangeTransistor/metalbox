(function(){'use strict';var k=function(p){'use strict';function q(B,C){if(1===arguments.length){for(var D=B[0],E=1;E<B.length;E++)D=q(D,B[E]);return D}for(var F in C)if('class'===F){var G=B[F]||[];B[F]=(Array.isArray(G)?G:[G]).concat(C[F]||[])}else if('style'===F){var G=u(B[F]),H=u(C[F]);B[F]=G+(G&&H&&';')+H}else B[F]=C[F];return B}/**
   * Process array, object, or string as a string of classes delimited by a space.
   *
   * If `val` is an array, all members of it and its subarrays are counted as
   * classes. If `escaping` is an array, then whether or not the item in `val` is
   * escaped depends on the corresponding item in `escaping`. If `escaping` is
   * not an array, no escaping is done.
   *
   * If `val` is an object, all the keys whose value is truthy are counted as
   * classes. No escaping is done.
   *
   * If `val` is a string, it is counted as a class. No escaping is done.
   *
   * @param {(Array.<string>|Object.<string, boolean>|string)} val
   * @param {?Array.<string>} escaping
   * @return {String}
   */function r(B,C){for(var E,D='',F='',G=Array.isArray(C),H=0;H<B.length;H++)E=t(B[H]),E&&(G&&C[H]&&(E=x(E)),D=D+F+E,F=' ');return D}function s(B){var C='',D='';for(var E in B)E&&B[E]&&z.call(B,E)&&(C=C+D+E,D=' ');return C}function t(B,C){return Array.isArray(B)?r(B,C):B&&'object'==typeof B?s(B):B||''}/**
   * Convert object or string to a string of CSS styles delimited by a semicolon.
   *
   * @param {(Object.<string, string>|string)} val
   * @return {String}
   */function u(B){if(!B)return'';if('object'==typeof B){var C='',D='';for(var E in B)/* istanbul ignore else */z.call(B,E)&&(C=C+D+E+':'+B[E],D=';');return C}return B=''+B,';'===B[B.length-1]?B.slice(0,-1):B}/**
   * Render the given attribute.
   *
   * @param {String} key
   * @param {String} val
   * @param {Boolean} escaped
   * @param {Boolean} terse
   * @return {String}
   */function v(B,C,D,E){return!1!==C&&null!=C&&(C||'class'!==B&&'style'!==B)?!0===C?' '+(E?B:B+'="'+B+'"'):('function'==typeof C.toJSON&&(C=C.toJSON()),'string'!=typeof C&&(C=JSON.stringify(C),!D&&-1!==C.indexOf('"')))?' '+B+'=\''+C.replace(/'/g,'&#39;')+'\'':(D&&(C=x(C)),' '+B+'="'+C+'"'):''}/**
   * Render the given attributes object.
   *
   * @param {Object} obj
   * @param {Object} terse whether to use HTML5 terse boolean attributes
   * @return {String}
   *//**
   * Escape the given string of `html`.
   *
   * @param {String} html
   * @return {String}
   * @api private
   */function x(B){var C=''+B,D=A.exec(C);if(!D)return B;var F,G,H,E='';for(F=D.index,G=0;F<C.length;F++){switch(C.charCodeAt(F)){case 34:H='&quot;';break;case 38:H='&amp;';break;case 60:H='&lt;';break;case 62:H='&gt;';break;default:continue;}G!==F&&(E+=C.substring(G,F)),G=F+1,E+=H}return G===F?E:E+C.substring(G,F)}/**
   * Re-throw the given `err` in context to the
   * the pug in `filename` at the given `lineno`.
   *
   * @param {Error} err
   * @param {String} filename
   * @param {String} lineno
   * @param {String} str original source
   * @api private
   */function y(B,C,D,E){if(!(B instanceof Error))throw B;if(('undefined'!=typeof window||!C)&&!E)throw B.message+=' on line '+D,B;try{E=E||require('fs').readFileSync(C,'utf8')}catch(J){y(B,null,D)}var F=3,G=E.split('\n'),H=Math.max(D-F,0),I=Math.min(G.length,D+F),F=G.slice(H,I).map(function(J,K){var L=K+H+1;return(L==D?'  > ':'    ')+L+'| '+J}).join('\n');// Error context
// Alter exception message
throw B.path=C,B.message=(C||'Pug')+':'+D+'\n'+F+'\n\n'+B.message,B}var z=Object.prototype.hasOwnProperty;/**
   * Merge two attribute objects giving precedence
   * to values in object `b`. Classes are special-cased
   * allowing for arrays and merging/joining appropriately
   * resulting in a string.
   *
   * @param {Object} a
   * @param {Object} b
   * @return {Object} a
   * @api private
   */p.merge=q,p.classes=t,p.style=u,p.attr=v,p.attrs=function(B,C){var D='';for(var E in B)if(z.call(B,E)){var F=B[E];if('class'===E){F=t(F),D=v(E,F,!1,C)+D;continue}'style'===E&&(F=u(F)),D+=v(E,F,!1,C)}return D};var A=/["&<>]/;return p.escape=x,p.rethrow=y,p}({});/*  */// bucket:index
0,0;(function(p,q=200){var r;return function(...s){r||(r=setTimeout(()=>{p.apply(this,s),r=!1},q))}})(()=>{console.log('other mod')});0,0})();