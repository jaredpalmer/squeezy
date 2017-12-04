# Squeezy

An tiny 1KB accessible React Accordion render prop component.

```
npm i squeezy
```

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

## `<Squeezy>` Props

### `id: string`

**Required**

An HTML `id` attribute. Used by Squeezy to make the accordion accessible.

### `debug?: boolean`

Log changes to Squeezy state to the console.

### `isOpen?: boolean`

If you want to make Squeezy a controlled component (i.e. manage its state
externally), pass Squeezy an `isOpen` prop.

### `onToggle?: (state: SqueezyState, helpers: SqueezyActions) => void`

Callback to run on state changes. If Squeezy is controlled, use this to set the
next state externally. Otherwise, good place for side effects.

### `render: (props: SqueezyProps) => React.ReactNode`

Render prop. The following state and helper methods are made available:

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

### Inspiration

* [react-toggled](https://github.com/kentcdodds/react-toggled)

## Author

* Jared Palmer ([@jaredpalmer](https://twitter.com/jaredpalmer))

---

MIT License
