
type $Providers$Base = Object

type $Providers<$base: $Providers$Base> = $base &
{
	derive <$derive: $Providers$Base> ($derive): $Providers<$base & $derive>,
	is_empty (): boolean,
}
