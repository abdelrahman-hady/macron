/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { Field } from 'Util/Query';
import getStore from 'Util/Store';

import BlogCategories from './BlogCategories.query';
import BlogPosts from './BlogPosts.query';
import BlogTags from './BlogTags.query';

/** @namespace Scandiweb/MagefanBlog/Query/BlogSidebar/Query */
export class BlogSidebarQuery {
    getSidebarData() {
        const {
            mfblog_sidebar_categories_enabled: categoriesEnabled,
            mfblog_sidebar_recent_posts_enabled: recentPostsEnabled,
            mfblog_sidebar_recent_posts_posts_per_page: recentPostsPostsPerPage,
            mfblog_sidebar_featured_posts_enabled: featuredPostsEnabled,
            mfblog_sidebar_featured_posts_posts_ids: featuredPostsPostsIds,
            mfblog_sidebar_popular_posts_enabled: popularPostsEnabled,
            mfblog_sidebar_popular_posts_posts_per_page: popularPostsPostsPerPage = [],
            mfblog_sidebar_archive_enabled: archiveEnabled,
            mfblog_sidebar_tag_claud_enabled: tagClaudEnabled,
            mfblog_sidebar_tag_claud_tag_count: tagClaudTagCount
        } = getStore().getState().ConfigReducer;
        const recentPostsProps = { pageSize: recentPostsPostsPerPage };
        const featuredPostsProps = {
            pageSize: featuredPostsPostsIds?.length,
            filter:
            { post_id: { in: featuredPostsPostsIds } }
        };
        const popularPostsProps = { pageSize: popularPostsPostsPerPage, sortField: 'views_count' };

        return [
            ...(categoriesEnabled === 1 ? [BlogCategories.getBlogCategories().setAlias('categories')] : []),
            ...(tagClaudEnabled === 1 ? [this.getSidebarBlogTags(tagClaudTagCount).setAlias('tags')] : []),
            ...(archiveEnabled === 1 ? [this.getSidebarBlogArchive().setAlias('archive')] : []),
            ...(recentPostsEnabled === 1 ? [BlogPosts.getBlogPosts(recentPostsProps).setAlias('recentPosts')] : []),
            ...(featuredPostsEnabled === 1
                ? [BlogPosts.getBlogPosts(featuredPostsProps).setAlias('featuredPosts')] : []),
            ...(popularPostsEnabled === 1 ? [BlogPosts.getBlogPosts(popularPostsProps).setAlias('popularPosts')] : [])
        ];
    }

    getSidebarBlogTags(tagCount) {
        return new Field('sw_sidebarBlogTags')
            .addArgument('tagCount', 'Int', tagCount)
            .addFieldList(
                [
                    'total_count',
                    this.getSidebarBlogTagsItemsField()
                ]
            );
    }

    getSidebarBlogTagsItemsField() {
        return new Field('items')
            .addFieldList(BlogTags.getBlogTagFields());
    }

    getSidebarBlogArchive() {
        return new Field('sw_sidebarArchive')
            .addFieldList(this.getSidebarBlogArchiveFields());
    }

    getSidebarBlogArchiveFields() {
        return [
            'id',
            'title',
            'url'
        ];
    }
}
export default new BlogSidebarQuery();
