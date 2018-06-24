
// $Thru & $Thru

// type $Thru<$in, $prov: $Providers$Base, $out>
// = $Producer<[ $Entry<$in>, $Context<$Entry<$in>, $prov> ], $Entry<$out>>

type $Thru<$in, $prov: $Providers$Base, $out>
= $Unit<$Entry<$in>, $prov, $Entry<$out>>
