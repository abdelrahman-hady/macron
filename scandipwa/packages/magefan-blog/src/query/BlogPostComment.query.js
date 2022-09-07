/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { Field } from 'Util/Query';

/** @namespace Scandiweb/MagefanBlog/Query/BlogPostComment/Query/BlogPostCommentQuery */
export class BlogPostCommentQuery {
    // TODO: vvv pageSize should be coming from a logic/config form backend/front end for now it's 100
    // eslint-disable-next-line no-magic-numbers
    getBlogCommentMutation(input, pageSize = 100, currentPage = 1) {
        return new Field('addCommentToPost')
            .addArgument('input', 'addCommentToPostInput', input)
            .addArgument('pageSize', 'Int', pageSize)
            .addArgument('currentPage', 'Int', currentPage)
            .addFieldList(this.getAddCommentToPostOutputFields());
    }

    getAddCommentToPostOutputFields() {
        return [
            'total_count',
            'total_pages',
            this.getCommentsField()
        ];
    }

    getCommentsField() {
        return new Field('comments')
            .addFieldList(this.getCommentFields(false));
    }

    getCommentFields(isReply) {
        return [
            'post_id',
            'comment_id',
            'parent_id',
            'customer_id',
            'admin_id',
            'status',
            'author_type',
            'author_nickname',
            'author_email',
            'text',
            'creation_time',
            'update_time',
            ...(!isReply ? [this.getRepliesField()] : [])
        ];
    }

    getRepliesField() {
        return new Field('replies')
            .addFieldList(this.getCommentFields(true));
    }
}

export default new BlogPostCommentQuery();
