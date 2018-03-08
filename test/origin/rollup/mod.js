
import once from 'lodash/once'

export default function mod ()
{
	return 'mod'
}

export var mod1 = once(() =>
{
	return 'mod1'
})
