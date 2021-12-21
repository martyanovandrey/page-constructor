import React from 'react';

import {block} from '../../utils';
import {MediaCardProps} from '../../models';
import Media from '../Media/Media';
import CardBase from '../CardBase/CardBase';

import './MediaCard.scss';

const b = block('MediaCard');

const MediaCard: React.FC<MediaCardProps> = ({border, ...mediaProps}) => {
    return (
        <CardBase className={b()} bodyClassName={b('body')} border={border}>
            <CardBase.Content>
                <Media {...mediaProps} />
            </CardBase.Content>
        </CardBase>
    );
};

export default MediaCard;
