# httpgd client

Browser client for [`httpgd`](https://github.com/nx10/httpgd). This is the official client built with [Svelte](https://svelte.dev/) and will be included included in `httpgd` 2.0.

> The client was originally built with a custom tech stack and developed inside the httpgd repository. Separating it in its own repo and porting it to Svelte specifically, should increase maintainability without noticable performace losses.

This client implementation is opinionated. See the [httpgd NPM package](https://github.com/nx10/httpgd-js) for unopinionated / general connection code to reuse in third party clients.

## Features / port progress

- &#x2705; Connection status
- &#x2705; Navigation
- &#x2705; Zoom
- &#x2705; Download, copy
- &#x1F527; Export dialog
- &#x1F527; Sidebar / thumbnail history
- &#x274C; Code cleanup

&#x2705; Done | &#x1F527; In progress | &#x274C; Coming soon

## Development

### Debug

```bash
yarn run dev
```

httpgd server on different port can be specified with the `hgd` query parameter:

```
http://localhost:8080/?hgd=127.0.0.1:1234
```

```R
httpgd::hgd(port = 1234, cors = TRUE, token = FALSE)
```

(CORS *must* be enabled, token *can* be disabled for debugging)

### Build

```bash
yarn run build
```
