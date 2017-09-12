
import mod from './mod'

function so () { return 1 - 1 }

if (so()) console.log(mod(1))

import mod2 from 'other-bucket/mod2'

so() && console.log(mod2(1))
so() && console.log(mod2('a'))
