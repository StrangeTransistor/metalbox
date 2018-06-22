
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

type $Entries<$content> = $Entry<$content>[]
