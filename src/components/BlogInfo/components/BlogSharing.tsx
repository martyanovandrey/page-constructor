/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useContext} from 'react';

// TODO refactor in https://st.yandex-team.ru/ORION-1444

import {ShareTooltip} from '@gravity-ui/uikit';

import {MobileContext} from '../../../contexts/MobileContext';
import {RouterContext} from '../../../contexts/RouterContext';
import {BlogPageContext} from '../../../contexts/BlogPageContext';

import {i18, BlogKeyset} from '../../../i18n';

import {getAbsolutePath} from '../../../utils/common';
import {block} from '../../../utils/cn';

import {MetrikaCounter} from '../../../counters/utils';

// TODO fixes and refactor in https://st.yandex-team.ru/ORION-1444
// @ts-ignore
import metrika from '../../../counters/metrika.js';

import {ShareArrowUp} from '../../../icons/ShareArrowUp';

import '../BlogInfo.scss';

const b = block('blog-info');

type BlogSharingProps = {
    theme?: 'light' | 'dark';
    metrikaGoal?: string;
};

export const BlogSharing: React.FC<BlogSharingProps> = ({theme, metrikaGoal}) => {
    const router = useContext(RouterContext);
    const isMobile = useContext(MobileContext);
    const {sharingSocialNetworks} = useContext(BlogPageContext);

    const handleMetrika = () => {
        metrika.reachGoal(MetrikaCounter.CrossSite, metrikaGoal);
    };

    //TODO return enum for direction after update LayoutDirections import

    return (
        <div className={b('item')}>
            <span className={b('icon')}>
                <ShareTooltip
                    url={getAbsolutePath(router)}
                    className={b('share')}
                    iconClass={b('share-icon')}
                    switcherClassName={b('switcher', {theme})}
                    tooltipClassName={b('popup')}
                    useWebShareApi={isMobile}
                    direction={'column' as ShareTooltip['props']['direction']}
                    buttonTitle={i18(BlogKeyset.ActionShare)}
                    customIcon={ShareArrowUp}
                    placement="bottom"
                    openByHover={false}
                    socialNets={sharingSocialNetworks}
                    handleMetrika={handleMetrika}
                />
            </span>
        </div>
    );
};