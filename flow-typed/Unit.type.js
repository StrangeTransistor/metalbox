
type $Fn<$product> = $Producer<[ $Context ], $product>

;

type $Unit<$product> =
{
	(context: $Context): Promise<$Outcome>,
}
