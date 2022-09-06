/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Loader from 'Component/Loader';

import { sidebarItemsType } from '../../type/MagefanBlog';
import SidebarArchive from '../SidebarArchive';
import SidebarCategories from '../SidebarCategories';
import SidebarCustomHtml from '../SidebarCustomHtml';
import SidebarPostLinked from '../SidebarPostLinked';
import SidebarSearch from '../SidebarSearch';
import SidebarTagCloud from '../SidebarTagCloud';
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
    TAG_CLAUD_ITEM_NAME
} from './Sidebar.config';

import './Sidebar.style';

/** @namespace Scandiweb/MagefanBlog/Component/Sidebar/Component/SidebarComponent */
export class SidebarComponent extends PureComponent {
    static propTypes = {
        sidebarItems: sidebarItemsType.isRequired,
        isSidebarLoading: PropTypes.bool.isRequired,
        isSidebarItemsLoading: PropTypes.bool.isRequired
    };

    renderMap = {
        [ARCHIVE_ITEM_NAME]: (dataLength) => this.renderSidebarArchive(dataLength),
        [CATEGORIES_ITEM_NAME]: (dataLength) => this.renderSidebarCategories(dataLength),
        [CUSTOM_HTML_ITEM_NAME]: (dataLength) => this.renderSidebarCustomHtml(CUSTOM_HTML_ITEM_NAME, dataLength),
        [CUSTOM_HTML2_ITEM_NAME]: () => this.renderSidebarCustomHtml(CUSTOM_HTML2_ITEM_NAME),
        [FEATURED_POSTS_ITEM_NAME]: (dataLength) => this.renderSidebarPostLinked(FEATURED_POSTS_ITEM_NAME, dataLength),
        [POPULAR_POSTS_ITEM_NAME]: (dataLength) => this.renderSidebarPostLinked(POPULAR_POSTS_ITEM_NAME, dataLength),
        [RECENT_POSTS_ITEM_NAME]: (dataLength) => this.renderSidebarPostLinked(RECENT_POSTS_ITEM_NAME, dataLength),
        [RSS_FEED_ITEM_NAME]: () => this.renderSidebarRSSFeed(),
        [SEARCH_ITEM_NAME]: () => this.renderSidebarSearch(),
        [TAG_CLAUD_ITEM_NAME]: (dataLength, data) => this.renderSidebarTagCloud(dataLength, data)
    };

    renderSortedSidebarComponent(item) {
        const { name, dataLength, data } = item;

        return this.renderMap[name](dataLength, data);
    }

    renderSortedSidebarComponents() {
        const { sidebarItems } = this.props;

        return sidebarItems.map((item) => this.renderSortedSidebarComponent(item));
    }

    renderSidebarArchive(dataLength) {
        const { isSidebarItemsLoading } = this.props;

        if (!isSidebarItemsLoading && dataLength < 1) {
            return null;
        }

        return <SidebarArchive key={ ARCHIVE_ITEM_NAME } />;
    }

    renderSidebarCategories(dataLength) {
        const { isSidebarItemsLoading } = this.props;

        if (!isSidebarItemsLoading && dataLength < 1) {
            return null;
        }

        return <SidebarCategories key={ CATEGORIES_ITEM_NAME } />;
    }

    renderSidebarCustomHtml(itemName) {
        return <SidebarCustomHtml itemName={ itemName } key={ itemName } />;
    }

    renderSidebarPostLinked(itemName, dataLength) {
        const { isSidebarItemsLoading } = this.props;

        if (!isSidebarItemsLoading && dataLength < 1) {
            return null;
        }

        return <SidebarPostLinked itemName={ itemName } key={ itemName } />;
    }

    renderSidebarRSSFeed() {
        return (
        <div key={ RSS_FEED_ITEM_NAME }>
            <p>{ __('RSS Feed is not supported by scandiweb.') }</p>
            <p>{ __('Please disable it from Admin panel') }</p>
            <small>{ __('Blog > Configuration > Sidebar > RSS Feed') }</small>
        </div>
        );
    }

    renderSidebarSearch() {
        return <SidebarSearch key={ SEARCH_ITEM_NAME } />;
    }

    renderSidebarTagCloud(dataLength, data) {
        const { isSidebarItemsLoading } = this.props;

        if (!isSidebarItemsLoading && dataLength < 1) {
            return null;
        }

        return <SidebarTagCloud key={ TAG_CLAUD_ITEM_NAME } tags={ data } />;
    }

    renderSidebarItems() {
        const { isSidebarLoading } = this.props;
        if (isSidebarLoading) {
            return <Loader />;
        }

        return this.renderSortedSidebarComponents();
    }

    render() {
        return (
            <div className="sidebar sidebar-additional">
                { this.renderSidebarItems() }
            </div>
        );
    }
}

export default SidebarComponent;
