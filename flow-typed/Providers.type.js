
type $Providers$Base = Object

;

type $Providers<$base: $Providers$Base> = $base &
{
	derive <$derive: $Providers$Base> (providers: $derive): $Providers<$base & $derive>,
	is_empty (): boolean,
}
