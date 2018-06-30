
type $Entry<$content> =
{
	filename:  string,
	content:  $content,
}

type $File =
{
	content:     string,
	sourcemap?: ?Object,
}

opaque type $Remove = Symbol

type $Mutable<$content> = ($content | $Remove)

type $Entries<$content> = $Entry<$content>[]
