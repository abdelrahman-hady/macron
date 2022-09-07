/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { Field } from 'Util/Query';

import BlogPostComment from './BlogPostComment.query';

/** @namespace Scandiweb/MagefanBlog/Query/BlogPostComments/Query/BlogPostCommentsQuery */
export class BlogPostCommentsQuery {
    // TODO: vvv pageSize should be coming from a logic/config form backend/front end for now it's 100
    // eslint-disable-next-line no-magic-numbers
    getBlogComments({ filter, pageSize = 100, currentPage = 1 }) {
        return new Field('blogComments')
            .addArgument('filter', 'BlogCommentsFilterInput', filter)
            .addArgument('pageSize', 'Int', pageSize)
            .addArgument('currentPage', 'Int', currentPage)
            .addFieldList(this.getBlogCommentsFields());
    }

    getBlogCommentsFields() {
        return [
            'total_count',
            'total_pages',
            this.getBlogCommentsItemsField()
        ];
    }

    getBlogCommentsItemsField() {
        return new Field('items')
            .addFieldList(BlogPostComment.getCommentFields());
    }
}

export default new BlogPostCommentsQuery();
