
type T_Pipe<In, Out, Env> = (input: In, env: Env) => WeakProduct<Out>;
