/**
 * Copyright (c) 2017-present Jared Palmer
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from 'react';
import { isEmptyChildren } from './utils';

export interface SqueezyConfig {
  /** Should squeezy be open by default. Default is false. */
  defaultOpen?: boolean;
  /** HTML id attribute. Required for accessibility. */
  id: string;
  /** pass true to log squeezy state and updates to the console. */
  debug?: boolean;
  /** Is the accordion open or not. Use when you want squeezy to be a controlled component. */
  isOpen?: boolean;
  /** Fires when squeezy state changes */
  onToggle?: (state: SqueezyState, bag: SqueezyHelpers) => void;
  /** Render Props */
  render?: (props: SqueezyProps) => React.ReactNode | React.ReactNode;
  children?: (props: SqueezyProps) => React.ReactNode | React.ReactNode;
  component?: React.ComponentType<SqueezyProps | void>;
}

export interface SqueezyState {
  isOpen: boolean;
}

export interface SqueezyHelpers {
  /** Button / toggler prop getter */
  getButtonProps: (props?: any) => object;
  /** Content prop getter */
  getContentProps: (props?: any) => object;
  /** Toggle the accordion to the opposite state */
  toggle: () => void;
  /** Close the accordion*/
  close: () => void;
  /** Open the accordion*/
  open: () => void;
}

export type SqueezyProps = SqueezyState & SqueezyHelpers;

export class Squeezy extends React.Component<SqueezyConfig, SqueezyState> {
  static defaultProps = {
    defaultOpen: false,
    // tslint:disable-next-line:no-empty
    onToggle: () => {},
  };

  constructor(props: SqueezyConfig) {
    super(props);
    this.state = {
      isOpen: props.isOpen || props.defaultOpen!,
    };
  }

  reducer = (state: SqueezyState, action: 'toggle' | 'open' | 'close') => {
    if (this.props.debug) {
      console.log(`Squeezy ${this.props.id}: ${action.toUpperCase()}`);
    }

    switch (action) {
      case 'toggle':
        return { isOpen: !state.isOpen };
      case 'open':
        return { isOpen: true };
      case 'close':
        return { isOpen: false };
      default:
        return state;
    }
  };

  dispatch = (action: 'toggle' | 'open' | 'close') => {
    if (this.props.isOpen === undefined) {
      this.setState(
        prevState => this.reducer(prevState, action),
        () => {
          this.props.onToggle!(this.state, this.getSqueezyHelpers());
        }
      );
    } else {
      this.props.onToggle!(
        { isOpen: !this.props.isOpen },
        this.getSqueezyHelpers()
      );
    }
  };

  getButtonProps = (props?: any) => {
    return {
      type: 'button',
      'aria-expanded': this.state.isOpen,
      'aria-controls': this.props.id,
      id: `accordian-control-${this.props.id}`,
      onClick: this.toggle,
      ...props,
    };
  };

  getContentProps = (props?: any) => {
    return {
      id: this.props.id,
      'aria-hidden': !this.state.isOpen,
      ...props,
    };
  };

  toggle = () => this.dispatch('toggle');
  open = () => this.dispatch('open');
  close = () => this.dispatch('close');

  getSqueezyProps = () => {
    return {
      ...this.state,
      ...this.getSqueezyHelpers(),
    };
  };

  getSqueezyHelpers = () => {
    return {
      getButtonProps: this.getButtonProps,
      getContentProps: this.getContentProps,
      toggle: this.toggle,
      open: this.open,
      close: this.close,
    };
  };

  render() {
    const { render, component, children } = this.props;
    return component
      ? React.createElement(component as any, this.getSqueezyProps())
      : render
        ? (render as any)(this.getSqueezyProps())
        : children // children come last, always called
          ? typeof children === 'function'
            ? children(this.getSqueezyProps())
            : !isEmptyChildren(children) ? React.Children.only(children) : null
          : null;
  }
}
