
type $Entry$Base =
{
	filename:   string,
	content:    string,
}

;

type $Entry = $Entry$Base &
{
	sourcemap: ?Object,
}

;

/* $Shape not working */
type $Entry$Optional = $Entry$Base &
{
	sourcemap?: ?Object
}
