import * as React from 'react';
import PortalManager from './PortalManager';
declare type Props = {
    children: React.ReactNode;
};
declare type Operation = {
    type: 'mount';
    key: number;
    children: React.ReactNode;
} | {
    type: 'update';
    key: number;
    children: React.ReactNode;
} | {
    type: 'unmount';
    key: number;
};
export declare type PortalMethods = {
    mount: (children: React.ReactNode) => number;
    update: (key: number, children: React.ReactNode) => void;
    unmount: (key: number) => void;
};
export declare const PortalContext: React.Context<PortalMethods>;
/**
 * Portal host renders all of its children `Portal` elements.
 * For example, you can wrap a screen in `Portal.Host` to render items above the screen.
 * If you're using the `Provider` component, it already includes `Portal.Host`.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Text } from 'react-native';
 * import { Portal } from 'react-native-paper';
 *
 * export default class MyComponent extends React.Component {
 *   render() {
 *     return (
 *       <Portal.Host>
 *         <Text>Content of the app</Text>
 *       </Portal.Host>
 *     );
 *   }
 * }
 * ```
 *
 * Here any `Portal` elements under `<App />` are rendered alongside `<App />` and will appear above `<App />` like a `Modal`.
 */
export default class PortalHost extends React.Component<Props> {
    static displayName: string;
    componentDidMount(): void;
    _setManager: (manager: PortalManager | null | undefined) => void;
    _mount: (children: React.ReactNode) => number;
    _update: (key: number, children: React.ReactNode) => void;
    _unmount: (key: number) => void;
    _nextKey: number;
    _queue: Operation[];
    _manager: PortalManager | null | undefined;
    render(): JSX.Element;
}
export {};
