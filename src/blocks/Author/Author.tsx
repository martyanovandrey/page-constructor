import React, {useMemo, useContext} from 'react';

import {Author as PCAuthor, AuthorType} from '@gravity-ui/page-constructor';
import {ClassNameProps} from '@yandex-data-ui/cloud-components';

import {PostPageContext} from '../../contexts/PostPageContext';

import {Wrapper} from '../../components/Wrapper/Wrapper';
import {PaddingsDirections, PaddingsYFMProps} from '../../models/paddings';

import {block} from '../../utils/cn';

import './Author.scss';

const b = block('author');

export type AuthorProps = ClassNameProps & {
    authorId: number;
    image: string;
} & PaddingsYFMProps;

// TODO: should we use an Author component from the page-constructor https://st.yandex-team.ru/CLOUDFRONT-8880#6267038c1864952e2194b016
export const Author: React.FC<AuthorProps> = (props) => {
    const {image, paddingTop, paddingBottom, authorId} = props;

    const {post} = useContext(PostPageContext);

    const author = post?.authors?.find(({id}: {id: number}) => id === authorId);

    const authorItem = useMemo(() => {
        const imageUrl = author?.avatar ?? image;
        const authorAvatar = <img src={imageUrl} alt="author" />;

        return {
            firstName: author?.firstName || '',
            secondName: author?.secondName || '',
            description: author?.fullDescription || '',
            avatar: authorAvatar,
        };
    }, [author?.avatar, author?.firstName, author?.fullDescription, author?.secondName, image]);

    if (!authorItem?.firstName || !authorItem?.secondName) {
        return null;
    }

    return (
        <Wrapper
            paddings={{
                [PaddingsDirections.top]: paddingTop,
                [PaddingsDirections.bottom]: paddingBottom,
            }}
            className={b('content')}
        >
            <div className={b('layout')} data-qa="blog-author-layout">
                <PCAuthor
                    type={AuthorType.Column}
                    author={authorItem}
                    authorContainerClassName={b('container')}
                />
            </div>
        </Wrapper>
    );
};
