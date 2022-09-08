/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import Loader from 'Component/Loader';

import { archivesType } from '../../type/MagefanBlog';
import { parsePostPath } from '../../util/BlogPage';

import './SidebarArchive.style';

/** @namespace Scandiweb/MagefanBlog/Component/SidebarArchive/Component/SidebarArchiveComponent */
export class SidebarArchiveComponent extends PureComponent {
    static propTypes = {
        archive: archivesType.isRequired,
        isSidebarItemsLoading: PropTypes.bool.isRequired
    };

    renderArchiveItem({
        id,
        title,
        url
    }) {
        return (
            <div className="item" key={ id }>
                <Link
                  title={ `Archive ${title}` }
                  className="archive-item-link"
                  to={ parsePostPath(url) }
                >
                    { title }
                </Link>
            </div>
        );
    }

    renderArchiveItems(archive) {
        return archive.map((item) => this.renderArchiveItem(item));
    }

    renderContent() {
        const { isSidebarItemsLoading, archive } = this.props;

        if (isSidebarItemsLoading) {
            return <Loader />;
        }

        return (
            <div className="block-content">
                { this.renderArchiveItems(archive) }
            </div>
        );
    }

    renderTitle() {
        return (
            <div className="block-title">
                <strong>{ __('Archive') }</strong>
            </div>
        );
    }

    render() {
        return (
            <div className="widget block block-archive">
                { this.renderTitle() }
                { this.renderContent() }
            </div>
        );
    }
}

export default SidebarArchiveComponent;
