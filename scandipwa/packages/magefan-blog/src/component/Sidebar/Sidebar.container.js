/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { MagefanBlogContext } from '../../context/MagefanBlog';
import Sidebar from './Sidebar.component';
import {
    ARCHIVE_ITEM_NAME,
    CATEGORIES_ITEM_NAME,
    CUSTOM_HTML_ITEM_NAME,
    CUSTOM_HTML2_ITEM_NAME,
    FEATURED_POSTS_ITEM_NAME,
    POPULAR_POSTS_ITEM_NAME,
    RECENT_POSTS_ITEM_NAME,
    RSS_FEED_ITEM_NAME,
    SEARCH_ITEM_NAME,
    SIDEBAR_ITEM_IS_ENABLED,
    TAG_CLAUD_ITEM_NAME
} from './Sidebar.config';

/** @namespace Scandiweb/MagefanBlog/Component/Sidebar/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    searchEnabled: state.ConfigReducer.mfblog_sidebar_search_enabled,
    searchSortOrder: state.ConfigReducer.mfblog_sidebar_search_sort_order,
    categoriesEnabled: state.ConfigReducer.mfblog_sidebar_categories_enabled,
    categoriesSortOrder: state.ConfigReducer.mfblog_sidebar_categories_sort_order,
    recentPostsEnabled: state.ConfigReducer.mfblog_sidebar_recent_posts_enabled,
    recentPostsSortOrder: state.ConfigReducer.mfblog_sidebar_recent_posts_sort_ordere,
    featuredPostsEnabled: state.ConfigReducer.mfblog_sidebar_featured_posts_enabled,
    featuredPostsSortOrder: state.ConfigReducer.mfblog_sidebar_featured_posts_sort_order,
    popularPostsEnabled: state.ConfigReducer.mfblog_sidebar_popular_posts_enabled,
    popularPostsSortOrder: state.ConfigReducer.mfblog_sidebar_popular_posts_sort_order,
    archiveEnabled: state.ConfigReducer.mfblog_sidebar_archive_enabled,
    archiveSortOrder: state.ConfigReducer.mfblog_sidebar_archive_sort_order,
    tagClaudEnabled: state.ConfigReducer.mfblog_sidebar_tag_claud_enabled,
    tagClaudSortOrder: state.ConfigReducer.mfblog_sidebar_tag_claud_sort_order,
    customEnabled: state.ConfigReducer.mfblog_sidebar_custom_enabled,
    customSortOrder: state.ConfigReducer.mfblog_sidebar_custom_sort_order,
    custom2Enabled: state.ConfigReducer.mfblog_sidebar_custom2_enabled,
    custom2SortOrder: state.ConfigReducer.mfblog_sidebar_custom2_sort_order,
    rssFeedEnabled: state.ConfigReducer.mfblog_sidebar_rss_feed_enabled,
    rssFeedSortOrder: state.ConfigReducer.mfblog_sidebar_rss_feed_sort_order
});

/** @namespace Scandiweb/MagefanBlog/Component/Sidebar/Container/mapDispatchToProps */
export const mapDispatchToProps = (_dispatch) => ({});

/** @namespace Scandiweb/MagefanBlog/Component/Sidebar/Container/SidebarContainer */
export class SidebarContainer extends PureComponent {
    static propTypes = {
        searchEnabled: PropTypes.number.isRequired,
        searchSortOrder: PropTypes.number.isRequired,
        categoriesEnabled: PropTypes.number.isRequired,
        categoriesSortOrder: PropTypes.number.isRequired,
        recentPostsEnabled: PropTypes.number.isRequired,
        recentPostsSortOrder: PropTypes.number.isRequired,
        featuredPostsEnabled: PropTypes.number.isRequired,
        featuredPostsSortOrder: PropTypes.number.isRequired,
        popularPostsEnabled: PropTypes.number.isRequired,
        popularPostsSortOrder: PropTypes.number.isRequired,
        archiveEnabled: PropTypes.number.isRequired,
        archiveSortOrder: PropTypes.number.isRequired,
        tagClaudEnabled: PropTypes.number.isRequired,
        tagClaudSortOrder: PropTypes.number.isRequired,
        customEnabled: PropTypes.number.isRequired,
        customSortOrder: PropTypes.number,
        custom2Enabled: PropTypes.number.isRequired,
        custom2SortOrder: PropTypes.number,
        rssFeedEnabled: PropTypes.number.isRequired,
        rssFeedSortOrder: PropTypes.number.isRequired
    };

    static defaultProps = {
        customSortOrder: null,
        custom2SortOrder: null
    };

    static contextType = MagefanBlogContext;

    containerFunctions = {};

    containerProps() {
        const { isSidebarLoading, isSidebarItemsLoading } = this.context;

        return { sidebarItems: this.getEnabledItems(), isSidebarLoading, isSidebarItemsLoading };
    }

    getSortedOrder() {
        const {
            searchEnabled,
            searchSortOrder,
            categoriesEnabled,
            categoriesSortOrder,
            recentPostsEnabled,
            recentPostsSortOrder,
            featuredPostsEnabled,
            featuredPostsSortOrder,
            popularPostsEnabled,
            popularPostsSortOrder,
            archiveEnabled,
            archiveSortOrder,
            tagClaudEnabled,
            tagClaudSortOrder,
            customEnabled,
            customSortOrder,
            custom2Enabled,
            custom2SortOrder,
            rssFeedEnabled,
            rssFeedSortOrder
        } = this.props;

        const sidebarItems = [
            {
                name: SEARCH_ITEM_NAME,
                isEnabled: this.convertToBoolean(searchEnabled),
                order: searchSortOrder
            },
            {
                name: CATEGORIES_ITEM_NAME,
                isEnabled: this.convertToBoolean(categoriesEnabled),
                order: categoriesSortOrder,
                dataLength: (() => {
                    const { sidebarCategories: categories } = this.context;
                    return categories.length;
                })()
            },
            {
                name: RECENT_POSTS_ITEM_NAME,
                isEnabled: this.convertToBoolean(recentPostsEnabled),
                order: recentPostsSortOrder,
                dataLength: (() => {
                    const { sidebarRecentPosts: recentPosts } = this.context;
                    return recentPosts.length;
                })()
            },
            {
                name: FEATURED_POSTS_ITEM_NAME,
                isEnabled: this.convertToBoolean(featuredPostsEnabled),
                order: featuredPostsSortOrder,
                dataLength: (() => {
                    const { sidebarFeaturedPosts: featuredPosts } = this.context;
                    return featuredPosts.length;
                })()
            },
            {
                name: POPULAR_POSTS_ITEM_NAME,
                isEnabled: this.convertToBoolean(popularPostsEnabled),
                order: popularPostsSortOrder,
                dataLength: (() => {
                    const { sidebarPopularPosts: popularPosts } = this.context;
                    return popularPosts.length;
                })()
            },
            {
                name: ARCHIVE_ITEM_NAME,
                isEnabled: this.convertToBoolean(archiveEnabled),
                order: archiveSortOrder,
                dataLength: (() => {
                    const { sidebarArchive: archive } = this.context;
                    return archive.length;
                })()
            },
            {
                name: TAG_CLAUD_ITEM_NAME,
                isEnabled: this.convertToBoolean(tagClaudEnabled),
                order: tagClaudSortOrder,
                data: (() => {
                    const { sidebarTags: tags } = this.context;
                    return tags;
                })(),
                dataLength: (() => {
                    const { sidebarTags: tags } = this.context;
                    return tags.length;
                })()
            },
            {
                name: CUSTOM_HTML_ITEM_NAME,
                isEnabled: this.convertToBoolean(customEnabled),
                order: customSortOrder
            },
            {
                name: CUSTOM_HTML2_ITEM_NAME,
                isEnabled: this.convertToBoolean(custom2Enabled),
                order: custom2SortOrder
            },
            {
                name: RSS_FEED_ITEM_NAME,
                isEnabled: this.convertToBoolean(rssFeedEnabled),
                order: rssFeedSortOrder
            }
        ];

        return sidebarItems.sort((firstItem, secondItem) => firstItem.order - secondItem.order);
    }

    getEnabledItems() {
        const sortedItems = this.getSortedOrder();

        return sortedItems.filter((item) => {
            const { isEnabled } = item;

            return isEnabled;
        });
    }

    convertToBoolean(property) {
        return property === SIDEBAR_ITEM_IS_ENABLED;
    }

    render() {
        return (
            <Sidebar
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
