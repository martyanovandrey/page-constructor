import {
    AnimatableProps,
    containerSizesObject,
    ChildrenCardsProps,
    BlockBaseProps,
    TitleProps,
} from '../../schema/validators/common';

export const CardLayoutProps = {
    additionalProperties: false,
    required: ['title'],
    properties: {
        ...BlockBaseProps,
        ...AnimatableProps,
        title: {
            oneOf: [{type: 'string', contentType: 'text'}, TitleProps],
        },
        description: {
            type: 'string',
            contentType: 'yfm',
        },
        colSizes: containerSizesObject,
        children: ChildrenCardsProps,
    },
};

export const CardLayoutBlock = {
    'card-layout-block': CardLayoutProps,
};
