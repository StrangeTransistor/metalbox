
type $Providers$Base = Object

;

type $Providers<$base: $Providers$Base> = $base &
{
	extend <$extend: Object> (providers: $extend): $Providers<$base & $extend>
}
