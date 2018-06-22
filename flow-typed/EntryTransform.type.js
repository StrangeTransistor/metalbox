
type $Entry$Transform<$in, $prov: $Providers$Base, $out>
= $Producer<[ $Entry<$in>, $Context<$Entry<$in>, $prov> ], $Entry<$out>>

type $Unit$Entry$Transform<$in, $prov: $Providers$Base, $out>
= $Unit<$Entry<$in>, $prov, $Entry<$out>>
