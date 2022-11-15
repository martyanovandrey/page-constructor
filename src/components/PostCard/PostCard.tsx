import React, {useMemo, useContext} from 'react';

import {CardBase, YFMWrapper, MetrikaGoal, HTML} from '@gravity-ui/page-constructor';

import {LikesContext} from '../../contexts/LikesContext';

import {SuggestBlogInfo} from '../../components/BlogInfo/SuggestBlogInfo';
import {BlogPostData} from '../../models/blog';

import {block} from '../../utils/cn';

import './PostCard.scss';

const b = block('blog-post-card');

type PostCardProps = {
    post: BlogPostData;
    fullWidth?: boolean;
    showTag?: boolean;
    size?: 's' | 'm';
    metrikaGoals?: MetrikaGoal;
    // delete this prop after Realese of BlogFeed https://st.yandex-team.ru/CLOUDFRONT-11056
    isModernIcon?: boolean;
};

export const PostCard: React.FC<PostCardProps> = ({
    post,
    metrikaGoals,
    fullWidth = false,
    size = 's',
    showTag = false,
    isModernIcon,
}) => {
    const {
        title: postTitle,
        htmlTitle,
        textTitle,
        blogPostId,
        id,
        date,
        readingTime,
        hasUserLike,
        likes,
        image,
        description,
        tags,
        url,
    } = post;

    const title = postTitle || textTitle || htmlTitle;

    const {toggleLike, hasLikes} = useContext(LikesContext);

    const likesProps = useMemo(
        () =>
            hasLikes
                ? {
                      hasUserLike,
                      likesCount: likes,
                      toggleLike,
                  }
                : undefined,
        [hasUserLike, likes, toggleLike, hasLikes],
    );

    return (
        <CardBase url={url} metrikaGoals={metrikaGoals} className={b('card', {fullWidth})}>
            <CardBase.Header image={image} className={b('header', {fullWidth})}>
                <div className={b('image-container')} />
            </CardBase.Header>
            <CardBase.Content>
                {showTag && tags?.[0]?.name && (
                    <div className={b('tag', {size})}>{tags[0].name}</div>
                )}
                {title && (
                    <h4 className={b('title', {size})}>
                        <span>
                            <HTML>{title}</HTML>
                        </span>
                    </h4>
                )}
                {description && (
                    <YFMWrapper
                        className={b('description')}
                        content={description}
                        modifiers={{
                            blog: size === 'm',
                            blogCard: true,
                        }}
                    />
                )}
            </CardBase.Content>
            <CardBase.Footer>
                <SuggestBlogInfo
                    blogPostId={blogPostId || id}
                    date={date}
                    readingTime={readingTime}
                    hasUserLike={hasUserLike}
                    likes={likesProps}
                    size={size}
                    isModernIcon={isModernIcon}
                />
            </CardBase.Footer>
        </CardBase>
    );
};