# metalbox + metalbucket

**metalbox** — set of components for building/releasing stuff.

```sh
metalbox run <release>   # run Release from local or `src/release`
metalbox preset <preset> # run from package.json `metalbox.presets`
metalbox template <template> # as `run` but `dst = .`, does not require `package.json`
```

**metalbucket** — *Frontend*, *Backend* and *Library* targets
we use in StrangeTransistor implemented on top of *metalbox*.

Run Releases & templates:
```sh
metalbox run
# or
metalbox r Backend
           Backend/Dev
           Frontend
           Frontend/Dev
           Library
           Library/Dev

metalbox template
# or
metalbox t template/Frontend
```

```json
  "metalbox":
  {
    "presets":
    {
      "dev":
      [
        "Frontend/Dev",
        {
          "dst": "release/dev"
        }
      ]
    }
  },
```

Run presets:
```sh
metalbox preset
# or
metalbox p dev # run `metalbox.presets.dev`
```

**urls**:
```css
background: url(~assets/index/image.png);
```

```jade
link(rel='stylesheet' href=asset('index.css'))
script(src=asset('index.js'))
div(style={ 'background-image': asset.url('~assets/index/image.png') })
```

> — This… is a bucket.
>
> — Dear God!
>
> — There's more.
>
> — No!…

*— [Expiration Date](https://www.youtube.com/watch?v=JmSqorj-EC0)*

## license
ISC © StrangeTransistor, 2016 — 2017.
