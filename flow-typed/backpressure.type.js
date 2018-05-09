
export type flyd$Stream$Backpressure<$value>
/* @flow-off */
= flyd$Stream<$value>
&
{
	continue (): void,
}
