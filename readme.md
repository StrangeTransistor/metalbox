# metalbox + metalbucket

**metalbox** — set of components for building/releasing stuff.

```sh
metalbox run <release>   # from local or `src/release`
metalbox preset <preset> # from package.json `metalbox.presets`
metalbox template <template> # as `run` but `dst = .`, does not require `package.json`
```

**metalbucket** — *Frontend*, *Backend* and *Library* targets
we use in StrangeTransistor implemented on top of *metalbox*.

```
npm run Backend
        Backend/Dev
        Frontend
        Frontend/Dev
        Library
        template/Frontend
```

> — This… is a bucket.
>
> — Dear God!
>
> — There's more.
>
> — No!…

*— [Expiration Date](https://www.youtube.com/watch?v=JmSqorj-EC0)*

© StrangeTransistor, 2016 — 2017.
