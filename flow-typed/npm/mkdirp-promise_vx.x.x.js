// flow-typed signature: c04c3a4262791510d3d72c3eaff80d89
// flow-typed version: <<STUB>>/mkdirp-promise_v5/flow_v0.59.0

declare module 'mkdirp-promise' {
  declare type Options = number | { mode?: number; fs?: mixed };

  declare module.exports: (path: string, options?: Options) => Promise<void>;
}
