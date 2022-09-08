/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

/** @namespace Scandiweb/MagefanBlog/Query/BlogTags/Query/BlogTagsQuery */
export class BlogTagsQuery {
    getBlogTagFields() {
        return [
            'tag_id',
            'tag_url',
            'identifier',
            'title',
            'meta_robots',
            'meta_description',
            'meta_keywords',
            'meta_title',
            'page_layout',
            'is_active',
            'content',
            'layout_update_xml',
            'custom_theme',
            'custom_layout',
            'custom_layout_update_xml',
            'custom_theme_from',
            'custom_theme_to'
        ];
    }
}
export default new BlogTagsQuery();
