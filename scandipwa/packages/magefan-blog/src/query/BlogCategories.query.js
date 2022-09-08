/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { Field } from 'Util/Query';

/** @namespace Scandiweb/MagefanBlog/Query/BlogCategories/Query/BlogCategoriesQuery */
export class BlogCategoriesQuery {
    getBlogCategories() {
        return new Field('blogCategories')
            .addFieldList(this.getBlogCategoriesFields());
    }

    getBlogCategoriesFields() {
        return [
            'total_count',
            this.getBlogCategoryItemsField()
        ];
    }

    getBlogCategoryItemsField() {
        return new Field('items')
            .addFieldList(this.getCategoryFields());
    }

    getCategoryFields() {
        return [
            'category_id',
            'parent_category_id',
            'category_url',
            'category_level',
            'identifier',
            'title',
            'meta_title',
            'meta_keywords',
            'meta_description',
            'canonical_url',
            'content_heading',
            'content',
            'path',
            'position',
            'posts_sort_by',
            'include_in_menu',
            'is_active',
            'display_mode',
            'page_layout',
            'layout_update_xml',
            'custom_theme',
            'custom_layout',
            'custom_layout_update_xml',
            'custom_theme_from',
            'custom_theme_to',
            'category_url_path',
            'posts_count'
        ];
    }
}
export default new BlogCategoriesQuery();
