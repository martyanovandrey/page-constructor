import {typografToText, typografToHTML, yfmTransformer} from '@gravity-ui/page-constructor/server';

import {Lang} from '../models/locale';
import {PostData} from '../models/common';

/**
 * Func for transform post data
 *
 * @param postData - post data
 * @param lang - runtime language
 *
 * @returns -prepared post
 */
export const transformPost = (postData: PostData, lang: Lang) => {
    if (!postData) {
        console.error('Post not found');

        return {} as PostData;
    }

    const {tags, title, metaTitle, description, ...post} = postData;

    return {
        ...post,
        title,
        tags,
        textTitle: typografToText(title, lang),
        htmlTitle: typografToHTML(title, lang),
        metaTitle: metaTitle || title,
        description: yfmTransformer(lang, description as string),
    };
};