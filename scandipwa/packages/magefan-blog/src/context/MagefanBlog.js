/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ChildrenType } from 'Type/Common.type';
import { prepareQuery } from 'Util/Query';
import { executeGet } from 'Util/Request';

import BlogSidebarQuery from '../query/BlogSidebar.query';

export const MagefanBlogContext = createContext({
    isSidebarLoading: true,
    isSidebarItemsLoading: true,
    sidebarArchive: [],
    sidebarCategories: [],
    sidebarFeaturedPosts: [],
    sidebarRecentPosts: [],
    sidebarPopularPosts: [],
    sidebarTags: [],
    setSidebarData: () => {}
});

MagefanBlogContext.displayName = 'MagefanBlogContext';

/** @namespace Scandiweb/MagefanBlog/Context/MagefanBlog/MagefanBlogProvider */
export const MagefanBlogProvider = ({ children }) => {
    const [sidebarData, setSidebarData] = useState({
        isSidebarLoading: true,
        isSidebarItemsLoading: true,
        sidebarArchive: [],
        sidebarCategories: [],
        sidebarFeaturedPosts: [],
        sidebarRecentPosts: [],
        sidebarPopularPosts: [],
        sidebarTags: []
    });
    const ONE_MONTH_IN_SECONDS = 2592000;
    const {
        mfblog_sidebar_categories_enabled: categoriesEnabled,
        mfblog_sidebar_recent_posts_enabled: recentPostsEnabled,
        mfblog_sidebar_featured_posts_enabled: featuredPostsEnabled,
        mfblog_sidebar_popular_posts_enabled: popularPostsEnabled,
        mfblog_sidebar_archive_enabled: archiveEnabled,
        mfblog_sidebar_tag_claud_enabled: tagClaudEnabled
    } = useSelector((state) => state.ConfigReducer);

    useEffect(() => {
        // vvv i used '==' because i only need to check if its undefined or null. 0 is an acceptable value and as it's falsy value...
        // vvv ... we can't use '!!'
        if (categoriesEnabled == null) {
            return;
        }
        // ^^^ prevent going forward if we don't have the data

        setSidebarData((prevState) => ({
            ...prevState,
            isSidebarLoading: false
        }));
    }, [categoriesEnabled]); // <<< Only one prop form redux would be enough since they all coming together.

    const updateSidebarData = async () => {
        // vvv i used '==' because i only need to check if its undefined or null. 0 is an acceptable value and as it's falsy value...
        // vvv ... we can't use '!!'
        if (categoriesEnabled == null) {
            return;
        }
        // ^^^ prevent going forward if we don't have the data

        // VVV each variable is either 1 or 0 so if the sum of them is less than 1 it means none of them are enabled
        // VVV prevent going forward if we don't have at least one query to get
        if (categoriesEnabled
            + recentPostsEnabled
            + featuredPostsEnabled
            + popularPostsEnabled
            + archiveEnabled
            + tagClaudEnabled < 1) {
            setSidebarData((prevState) => ({
                ...prevState,
                isSidebarItemsLoading: false
            }));

            return;
        }
        // ^^^

        const query = BlogSidebarQuery.getSidebarData();

        try {
            const {
                archive = [],
                categories: { items: categories = [] } = {},
                featuredPosts: { items: featuredPosts = [] } = {},
                recentPosts: { items: recentPosts = [] } = {},
                popularPosts: { items: popularPosts = [] } = {},
                tags: { items: tags = [] } = {}

            } = await executeGet(prepareQuery(query), 'MagefanBlogSidebarData', ONE_MONTH_IN_SECONDS);

            setSidebarData((prevState) => ({
                ...prevState,
                isSidebarItemsLoading: false,
                sidebarArchive: archive,
                sidebarCategories: categories,
                sidebarFeaturedPosts: featuredPosts,
                sidebarRecentPosts: recentPosts,
                sidebarPopularPosts: popularPosts,
                sidebarTags: tags
            }));
        } catch (_error) {
            setSidebarData((prevState) => ({
                ...prevState,
                isSidebarItemsLoading: false
            }));
        }
    };

    useEffect(() => {
        updateSidebarData();
    }, [categoriesEnabled]); // <<< Only one prop form redux would be enough since they all coming together.

    const value = {
        ...sidebarData
    };

    return (
        <MagefanBlogContext.Provider value={ value }>
            { children }
        </MagefanBlogContext.Provider>
    );
};

MagefanBlogProvider.displayName = 'MagefanBlogProvider';

MagefanBlogProvider.propTypes = {
    children: ChildrenType.isRequired
};
