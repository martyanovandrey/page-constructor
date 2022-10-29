import React from 'react';
import {Content, ContentBlockProps, Image, NewMetrikaGoal} from '@gravity-ui/page-constructor';

import {BlogWrapper, PaddingSize} from '../../components/BlogWrapper/BlogWrapper';

import {getBlogElementMetrika, checkContentDefaults} from '../../utils/blog';
import {block} from '../../utils/cn';

import {BlogMetrikaGoalIds} from '../../constants';

import './BlogBanner.scss';

const b = block('banner');

export type BannerBlockProps = ContentBlockProps & {
    background?: string;
    color?: string;
    image?: string;
    imageSize?: 's' | 'm';
    paddingTop?: PaddingSize;
    paddingBottom?: PaddingSize;
};

export const BlogBannerBlock: React.FC<BannerBlockProps> = ({
    color,
    imageSize = 's',
    image,
    paddingTop,
    paddingBottom,
    ...contentData
}) => {
    const contentStyle: Record<string, string> = {};

    if (color) {
        contentStyle.backgroundColor = color;
    }

    checkContentDefaults(contentData);

    const metrikaGoal: NewMetrikaGoal = {
        name: BlogMetrikaGoalIds.bannerCommon,
        isCrossSite: true,
    };

    contentData.buttons?.forEach((button) => {
        button.metrikaGoals = getBlogElementMetrika(metrikaGoal, button.metrikaGoals);
    });

    return (
        <BlogWrapper
            paddingTop={paddingTop}
            paddingBottom={paddingBottom}
            className={b('container')}
        >
            <div className={b('content')} style={contentStyle}>
                <div className={b('info')}>
                    <Content {...contentData} />
                </div>
                {image && (
                    <div className={b('image-container', {['image-size']: imageSize})}>
                        <Image className={b('image')} src={image} />
                    </div>
                )}
            </div>
        </BlogWrapper>
    );
};
