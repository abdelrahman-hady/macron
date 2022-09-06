/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { Field } from 'Util/Query';

import BlogAuthor from './BlogAuthor.query';
import BlogCategories from './BlogCategories.query';
import BlogTags from './BlogTags.query';

/** @namespace Scandiweb/MagefanBlog/Query/BlogPost/Query/BlogPostQuery */
export class BlogPostQuery {
    getBlogPost({ id }) {
        return new Field('blogPost')
            .addArgument('id', 'String', id)
            .addFieldList(this.getBlogPostFields());
    }

    getBlogPostTitle({ id }) {
        return new Field('blogPost')
            .addArgument('id', 'String', id)
            .addField('title');
    }

    getBlogPostFields() {
        return [
            'post_id',
            'post_url',
            'identifier',
            'title',
            'og_title',
            'og_description',
            'og_image',
            'og_type',
            'comments_count',
            'canonical_url',
            'content_heading',
            'content',
            'filtered_content',
            'short_filtered_content',
            'creation_time',
            'update_time',
            'publish_time',
            'is_active',
            'include_in_recent',
            'position',
            'first_image',
            'featured_image',
            'featured_img_alt',
            'featured_list_image',
            'featured_list_img_alt',
            this.getBlogAuthorField(),
            'author_id',
            'search',
            'tag_id',
            this.getBlogTagsField(),
            this.getBlogCategoriesField(),
            'page_layout',
            'layout_update_xml',
            'custom_theme',
            'custom_layout',
            'custom_layout_update_xml',
            'custom_theme_from',
            'custom_theme_to',
            'media_gallery',
            'secret',
            'views_count',
            'is_recent_posts_skip',
            'short_content',
            'related_products',
            'relatedproduct_id',
            this.getRelatedPostField(),
            this.getNextPostField(),
            this.getPrevPostField()
        ];
    }

    getBlogAuthorField() {
        return new Field('author')
            .addFieldList(BlogAuthor.getBlogAuthorFields());
    }

    getBlogCategoriesField() {
        return new Field('categories')
            .addFieldList(BlogCategories.getCategoryFields());
    }

    getBlogTagsField() {
        return new Field('tags')
            .addFieldList(BlogTags.getBlogTagFields());
    }

    getRelatedPostField() {
        return new Field('related_posts')
            .addFieldList([
                'post_id',
                'post_url',
                'title',
                'secret',
                'is_recent_posts_skip',
                'relatedproduct_id'
            ]);
    }

    getPrevPostField() {
        return new Field('prevPost')
            .addFieldList(this.getNextPrevPostField());
    }

    getNextPostField() {
        return new Field('nextPost')
            .addFieldList(this.getNextPrevPostField());
    }

    getNextPrevPostField() {
        return [
            'url',
            'title'
        ];
    }
}

export default new BlogPostQuery();
