/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { Field } from 'Util/Query';

import BlogPost from './BlogPost.query';

/** @namespace Scandiweb/MagefanBlog/Query/BlogPosts/Query/BlogPostsQuery */
export class BlogPostsQuery {
    getBlogPosts({
        pageSize,
        sort = ['DESC'],
        sortField = 'publish_time',
        filter = {},
        currentPage = 1
    }) {
        const field = new Field('blogPosts')
            .addArgument('pageSize', 'Int', pageSize)
            .addArgument('sort', '[String]', sort)
            .addArgument('sortFiled', 'String', sortField)
            .addArgument('filter', 'BlogPostsFilterInput', filter)
            .addArgument('currentPage', 'Int', currentPage)
            .addFieldList(this.getBlogPostsFields());

        return field;
    }

    getBlogPostsFields() {
        return [
            'total_count',
            'total_pages',
            this.getBlogPostItemsField()
        ];
    }

    getBlogPostItemsField() {
        return new Field('items')
            .addFieldList(BlogPost.getBlogPostFields());
    }
}
export default new BlogPostsQuery();
