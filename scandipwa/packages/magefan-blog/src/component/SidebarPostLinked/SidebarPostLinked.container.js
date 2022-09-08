/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { MagefanBlogContext } from '../../context/MagefanBlog';
import SidebarPostLinked from './SidebarPostLinked.component';
import {
    FEATURED_POSTS_ITEM_NAME,
    POPULAR_POSTS_ITEM_NAME,
    RECENT_POSTS_ITEM_NAME
} from './SidebarPostLinked.config';

/** @namespace Scandiweb/MagefanBlog/Component/SidebarPostLinked/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    recentPostsDisplayImage: state.ConfigReducer.mfblog_sidebar_recent_posts_display_image,
    featuredPostsDisplayImage: state.ConfigReducer.mfblog_sidebar_featured_posts_display_image,
    popularPostsDisplayImage: state.ConfigReducer.mfblog_sidebar_popular_posts_display_image
});

/** @namespace Scandiweb/MagefanBlog/Component/SidebarPostLinked/Container/mapDispatchToProps */
export const mapDispatchToProps = (_dispatch) => ({});

/** @namespace Scandiweb/MagefanBlog/Component/SidebarPostLinked/Container/SidebarPostLinkedContainer */
export class SidebarPostLinkedContainer extends PureComponent {
    static propTypes = {
        itemName: PropTypes.string.isRequired,
        recentPostsDisplayImage: PropTypes.number.isRequired,
        featuredPostsDisplayImage: PropTypes.number.isRequired,
        popularPostsDisplayImage: PropTypes.number.isRequired
    };

    static contextType = MagefanBlogContext;

    getPostsMap = {
        [RECENT_POSTS_ITEM_NAME]: {
            getPosts: () => {
                const { sidebarRecentPosts } = this.context;
                return sidebarRecentPosts;
            },
            getDisplayImage: (() => {
                const { recentPostsDisplayImage } = this.props;
                return recentPostsDisplayImage;
            })
        },
        [FEATURED_POSTS_ITEM_NAME]: {
            getPosts: () => {
                const { sidebarFeaturedPosts } = this.context;
                return sidebarFeaturedPosts;
            },
            getDisplayImage: (() => {
                const { featuredPostsDisplayImage } = this.props;
                return featuredPostsDisplayImage;
            })
        },
        [POPULAR_POSTS_ITEM_NAME]: {
            getPosts: () => {
                const { sidebarPopularPosts } = this.context;
                return sidebarPopularPosts;
            },
            getDisplayImage: (() => {
                const { popularPostsDisplayImage } = this.props;
                return popularPostsDisplayImage;
            })
        }
    };

    containerFunctions = {
        getTitle: () => this.getTitle(),
        getClassName: () => this.getClassName()
    };

    containerProps() {
        const { itemName } = this.props;
        const { isSidebarItemsLoading } = this.context;

        return {
            posts: this.getPostsMap[itemName].getPosts(),
            itemName,
            displayImage: this.getPostsMap[itemName].getDisplayImage(),
            isSidebarItemsLoading
        };
    }

    getTitle = () => {
        const { itemName } = this.props;
        const title = itemName.replace('_', ' ').toLowerCase();
        return title;
    };

    getClassName = () => {
        const { itemName } = this.props;
        const ClassName = `block-${itemName.replace('_', '-').toLowerCase()}`;
        return ClassName;
    };

    render() {
        return (
            <SidebarPostLinked
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarPostLinkedContainer);
