
type $Entry<$content> =
{
	filename:  string,
	content:  $content,
}

;

type $Entry$File =
{
	content:     string,
	sourcemap?: ?Object,
}

;

type $Entry$Remove = Symbol

;

type $Entries<$content> = $Entry<$content>[]
