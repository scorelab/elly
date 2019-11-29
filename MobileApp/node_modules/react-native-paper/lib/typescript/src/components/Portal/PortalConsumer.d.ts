import * as React from 'react';
import { PortalMethods } from './PortalHost';
declare type Props = {
    manager: PortalMethods;
    children: React.ReactNode;
};
export default class PortalConsumer extends React.Component<Props> {
    componentDidMount(): Promise<void>;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    _key: any;
    _checkManager(): void;
    render(): null;
}
export {};
