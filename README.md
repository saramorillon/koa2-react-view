# koa2-react-view

React SSR with Koa 2

## Installation

With NPM

```bash
npm install koa2-react-view
```

Or with Yarn

```bash
yarn add koa2-react-view
```

## Usage

### Server file

```javascript
const Koa = require('koa')
const render = require('koa2-react-view')
/* Or
import Koa from 'koa'
import { render } from 'koa2-react-view'
*/

const app = new Koa()
// Register middleware
app.use(
  render({
    root: path.join(__dirname, 'views'),
    ext: 'jsx',
    cache: false,
    layout: 'Layout',
  })
)

// Use ctx.render to render a view with variables
app.use(async (ctx) => {
  return ctx.render('home', { name: 'World' })
})

app.listen(3000)
```

### View file

```jsx
import React from 'react'

// Views (as well as layout) should always be default exported
export default function Home({ name }) {
  return <div>Hello {name}!</div>
}
```

### Variables

Are available in the view:

- all the variables defined during `ctx.render` process
- `ctx.state`, through the `__state` prop

## Options

| name   | type    | mandatory | default value | description                                                                                     |
| ------ | ------- | --------- | ------------- | ----------------------------------------------------------------------------------------------- |
| root   | string  | yes       |               | root folder of the views                                                                        |
| ext    | string  | no        | jsx           | extension of the view (with or without a `.`)                                                   |
| cache  | boolean | no        | true          | should the views be cached or not (recommended: `true` for production, `false` for development) |
| layout | string  | no        |               | filename of the layout component views                                                          |

## Using a layout

You can use a layout to wrap your views. All variables available in the view are available in the layout.

```jsx
import React from 'react'

export default function Layout({ children }) {
  return (
    <html>
      <head></head>
      {/* Bellow is your view */}
      <body>{children}</body>
    </html>
  )
}
```
