
type $Providers$Base = Object

;

type $Providers<$base: $Providers$Base> = $base &
{
	extend <$extend: $Providers$Base> (providers: $extend): $Providers<$base & $extend>
}
