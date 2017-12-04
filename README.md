# Squeezy

An tiny 1KB React component for accessible accordions / collapse UI

```
npm i squeezy
```

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Usage](#usage)
- [API](#api)
  - [`<Squeezy>` Props](#squeezy-props)
    - [`id: string`](#id-string)
    - [`debug?: boolean`](#debug-boolean)
    - [`isOpen?: boolean`](#isopen-boolean)
    - [`onToggle?: (state: SqueezyState, helpers: SqueezyActions) => void`](#ontoggle-state-squeezystate-helpers-squeezyactions--void)
    - [`render: (props: SqueezyProps) => React.ReactNode`](#render-props-squeezyprops--reactreactnode)
  - [Squeezy State and Helpers](#squeezy-state-and-helpers)
    - [`getButtonProps(moreProps: any) => void`](#getbuttonpropsmoreprops-any--void)
    - [`getContentProps(moreProps: any) => void`](#getcontentpropsmoreprops-any--void)
    - [`isOpen: boolean`](#isopen-boolean)
    - [`close: () => void`](#close---void)
    - [`open: () => void`](#open---void)
    - [`toggle: () => void`](#toggle---void)
- [Inspiration](#inspiration)
- [Author](#author)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Usage

```js
import React from 'react';
import { Squeezy } from 'squeezy';

const App = () => (
  <div>
    <h1>My App</h1>

    <Squeezy
      id="thing"
      render={({ getButtonProps, getContentProps, isOpen }) => (
        <div>
          <div>
            Stuff
            <button {...getButtonProps({ className: 'whatever' })}>
              See {isOpen ? 'more' : 'less'}
            </button>
          </div>

          {isOpen ? (
            <div {...getContentProps({ className: '...' })}>Stuff to show</div>
          ) : null}
        </div>
      )}
    />
  </div>
);

export default App;
```

## API

### `<Squeezy>` Props

#### `id: string`

**Required**

An HTML `id` attribute. Used by Squeezy to make the accordion accessible.

#### `debug?: boolean`

Log changes to Squeezy state to the console.

#### `isOpen?: boolean`

If you want to make Squeezy a controlled component (i.e. manage its state
externally), pass Squeezy an `isOpen` prop.

#### `onToggle?: (state: SqueezyState, helpers: SqueezyActions) => void`

Callback to run on state changes. If Squeezy is controlled, use this to set the
next state externally. Otherwise, good place for side effects.

#### `render: (props: SqueezyProps) => React.ReactNode`

Render prop.

### Squeezy State and Helpers

#### `getButtonProps(moreProps: any) => void`

Prop getter that returns accessible accordion button props and click handlers

#### `getContentProps(moreProps: any) => void`

Prop getter that returns accessible accordion content props. Spread this on the
body / main area that you want show/hide

#### `isOpen: boolean`

Is the accordion open or close.

#### `close: () => void`

Close the accordion.

#### `open: () => void`

Open the accordion.

#### `toggle: () => void`

Toggle the accordion.

## Inspiration

* [react-toggled](https://github.com/kentcdodds/react-toggled)

## Author

* Jared Palmer ([@jaredpalmer](https://twitter.com/jaredpalmer))

---

MIT License
