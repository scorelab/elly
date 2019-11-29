import * as React from 'react';
declare type Item = {
    name: string;
    number: number;
};
export default class Contacts extends React.Component {
    _renderItem: ({ item }: {
        item: Item;
    }) => JSX.Element;
    _ItemSeparator: () => JSX.Element;
    render(): JSX.Element;
}
export {};
