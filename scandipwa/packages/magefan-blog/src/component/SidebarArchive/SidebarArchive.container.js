/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { PureComponent } from 'react';

import { MagefanBlogContext } from '../../context/MagefanBlog';
import SidebarArchive from './SidebarArchive.component';

/** @namespace Scandiweb/MagefanBlog/Component/SidebarArchive/Container/SidebarArchiveContainer */
export class SidebarArchiveContainer extends PureComponent {
    static contextType = MagefanBlogContext;

    containerFunctions = {};

    containerProps() {
        const { sidebarArchive, isSidebarItemsLoading } = this.context;

        return { archive: sidebarArchive, isSidebarItemsLoading };
    }

    render() {
        return (
            <SidebarArchive
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default SidebarArchiveContainer;
