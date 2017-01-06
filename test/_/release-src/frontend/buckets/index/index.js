// bucket:index

console.log('index')

var arrow1 = () => 1

// eslint-disable-next-line no-unused-vars
var arrow2 = () => 2

console.log([ 1, 2, 3 ].map(arrow1))
