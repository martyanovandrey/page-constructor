import React from 'react';

import {ServicePublic} from '@yandex-data-ui/cloud-schemas/build/models/ui-api';
import {
    PageConstructor,
    PageContent,
    PageConstructorProvider,
    PageConstructorProviderProps,
} from '@gravity-ui/page-constructor';

import {FeedContext} from '../../contexts/FeedContext';
import {LikesContext} from '../../contexts/LikesContext';

import {MetaWrapper} from '../../components/MetaWrapper/MetaWrapper';

import componentMap from '../../constructor/blocksMap';

import {
    BlogPostTag,
    BlogPagePostsData,
    ToggleLikeCallbackType,
    MetaProps,
    GetBlogPostsType,
    SetQueryType,
} from '../../models/common';

import './BlogPage.scss';

export type BlogPageProps = {
    content: PageContent;
    posts: BlogPagePostsData;
    tags: BlogPostTag[];
    services?: ServicePublic[];
    getPosts: GetBlogPostsType;
    toggleLike?: ToggleLikeCallbackType;
    metaData?: MetaProps;
    setQuery?: SetQueryType;
    settings?: PageConstructorProviderProps;
    pageCountForShowSupportButtons?: number;
};

export const BlogPage = ({
    content,
    posts,
    tags,
    services,
    getPosts,
    metaData,
    toggleLike,
    settings,
    pageCountForShowSupportButtons,
}: BlogPageProps) => (
    <main>
        <LikesContext.Provider
            value={{
                toggleLike: toggleLike,
                hasLikes: Boolean(toggleLike),
            }}
        >
            <FeedContext.Provider
                value={{
                    posts: posts.posts,
                    pinnedPost: posts.pinnedPost,
                    totalCount: posts.count,
                    tags,
                    services: services ?? [],
                    getPosts,
                    pageCountForShowSupportButtons,
                }}
            >
                <PageConstructorProvider {...settings}>
                    {metaData ? <MetaWrapper {...metaData} /> : null}
                    <PageConstructor content={content} custom={componentMap} />
                </PageConstructorProvider>
            </FeedContext.Provider>
        </LikesContext.Provider>
    </main>
);
