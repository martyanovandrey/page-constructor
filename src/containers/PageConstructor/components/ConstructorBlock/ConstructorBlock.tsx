import React, {ReactElement} from 'react';

import {Block, ShouldRenderBlock} from '../../../../models';
import BlockBase from '../../../../components/BlockBase/BlockBase';
import {block} from '../../../../utils';

const b = block('constructor-block');
interface ConstructorBlockProps {
    data: Block;
    key: string;
    Component: ReactElement;
    shouldRenderBlock?: ShouldRenderBlock;
}

export const ConstructorBlock: React.FC<ConstructorBlockProps> = ({
    data,
    key,
    Component,
    shouldRenderBlock,
}) => {
    const {anchor, visible} = data;

    if (shouldRenderBlock && !shouldRenderBlock(data, key)) {
        return null;
    }

    return (
        <BlockBase
            className={b({type: data.type})}
            key={key}
            anchor={anchor}
            visible={visible}
            resetPaddings={data.resetPaddings}
        >
            {Component}
        </BlockBase>
    );
};