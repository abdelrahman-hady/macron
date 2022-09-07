/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import Loader from 'Component/Loader';

import { archivesType as tagsType } from '../../type/MagefanBlog';
import { parsePostPath } from '../../util/BlogPage';

import './SidebarTagCloud.style';

/** @namespace Scandiweb/MagefanBlog/Component/SidebarTagCloud/Component/SidebarTagCloudComponent */
export class SidebarTagCloudComponent extends PureComponent {
    static propTypes = {
        tagClaudIsAnimated: PropTypes.number.isRequired,
        getTagClass: PropTypes.func.isRequired,
        tags: tagsType.isRequired,
        tagClaudCloudHeight: PropTypes.number.isRequired,
        isSidebarItemsLoading: PropTypes.bool.isRequired
    };

    renderMap = {
        0: {
            render: () => this.renderDefaultTags()
        },
        1: {
            render: () => this.renderAnimatedTags()
        }
    };

    renderAnimatedTags() {
        const { tagClaudCloudHeight } = this.props;

        return (
            <div id="blogSidebarCloudCanvasContainer">
                <canvas style={ { width: '100%', height: tagClaudCloudHeight } } id="blogSidebarCloudCanvas">
                    { this.renderDefaultTags() }
                </canvas>
            </div>
        );
    }

    renderTagsItem(tag, index) {
        const { getTagClass } = this.props;
        const {
            tag_id: tagId,
            tag_url: tagUrl,
            title
        } = tag;

        return (
            <span className={ getTagClass(index) } key={ tagId }>
                <Link to={ parsePostPath(tagUrl) } title={ title }>
                    { title }
                </Link>
            </span>
        );
    }

    renderTagsItems() {
        const { tags } = this.props;

        return tags.map((tag, index) => this.renderTagsItem(tag, index));
    }

    renderDefaultTags() {
        return (
            <div className="tagclaud-hld">
                { this.renderTagsItems() }
            </div>
        );
    }

    renderTags() {
        const { isSidebarItemsLoading, tagClaudIsAnimated } = this.props;

        if (isSidebarItemsLoading) {
            return <Loader />;
        }

        return this.renderMap[tagClaudIsAnimated].render();
    }

    renderTitle() {
        return (
            <div className="block-title">
                <strong>{ __('Tags') }</strong>
            </div>
        );
    }

    renderContent() {
        const { isSidebarItemsLoading } = this.props;

        if (isSidebarItemsLoading) {
            return <Loader />;
        }

        return (
            <>
                { this.renderTitle() }
                { this.renderTags() }
            </>
        );
    }

    render() {
        return (
            <div className="widget block block-tagclaud">
                { this.renderTitle() }
                { this.renderTags() }
            </div>
        );
    }
}

export default SidebarTagCloudComponent;
