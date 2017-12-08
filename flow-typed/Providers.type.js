
type $Providers<$base: Object> = $base &
{
	extend <$extend: Object> (providers: $extend): $Providers<$base & $extend>
}
