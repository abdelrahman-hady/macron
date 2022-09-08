/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { Field } from 'Util/Query';
/** @namespace Scandiweb/MagefanBlog/Query/BlogAuthor/Query/BlogAuthorQuery */
export class BlogAuthorQuery {
    getAuthor({ id }) {
        return new Field('blogAuthor')
            .addArgument('id', 'String', id)
            .addFieldList(this.getBlogAuthorFields());
    }

    getAuthorTitle({ id }) {
        return new Field('blogAuthor')
            .addArgument('id', 'String', id)
            .addField('title');
    }

    getBlogAuthorFields() {
        return [
            'author_id',
            'identifier',
            'title',
            'name',
            'meta_description',
            'meta_title',
            'url',
            'author_url',
            'is_active',
            'creation_time',
            'role',
            'featured_image',
            'content',
            'filtered_content',
            'short_content',
            'short_filtered_content',
            'facebook_page_url',
            'twitter_page_url',
            'instagram_page_url',
            'linkedin_page_url',
            'page_layout',
            'layout_update_xml',
            'custom_theme',
            'custom_layout',
            'custom_theme_from',
            'custom_theme_to',
            'custom_layout_update_xml'
        ];
    }
}

export default new BlogAuthorQuery();
