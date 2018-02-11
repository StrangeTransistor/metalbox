
export type flyd$Stream$Backpressure<$value>
= flyd$Stream<$value>
&
{
	continue (): void,
}
