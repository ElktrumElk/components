import type { ComponentType } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      page: any;
      header: any;
      text: any;
      container: any;
      stack: any;
      center: any;
      divider: any;
      panel: any;
      span: any;
      'scroll-view': any;
      section: any;
      article: any;
      navigator: any;
      button: any;
      'icon-button': any;
      'text-button': any;
      card: any;
      badge: any;
      avatar: any;
      image: any;
      input: any;
      tiles: any;
      list: any;
      'list-view': any;
      'list-menu': any;
      'bottom-modal': any;
      'side-panel': any;
      reabon: any;
      tab: any;
      'tab-view': any;
      icon: any;
      'icon-network': any;
      'page-scroll-view': any;
    }
  }
}

const registry = new Map<string, ComponentType<any>>();

export function register(name: string, component: ComponentType<any>) {
  registry.set(name, component);
}

export function getRegistered(name: string): ComponentType<any> | undefined {
  return registry.get(name);
}

export function setup() {
  // This file provides global type declarations
  // Components are auto-imported via the Vite plugin
  // No manual registration needed
}
