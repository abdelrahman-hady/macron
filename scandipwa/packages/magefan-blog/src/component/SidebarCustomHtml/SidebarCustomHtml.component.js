/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Html from 'Component/Html';

/** @namespace Scandiweb/MagefanBlog/Component/SidebarCustomHtml/Component/SidebarCustomHtmlComponent */
export class SidebarCustomHtmlComponent extends PureComponent {
    static propTypes = {
        htmlData: PropTypes.string.isRequired
    };

    render() {
        const { htmlData } = this.props;

        return (
            <div className="widget block blog-custom">
                <Html content={ htmlData } />
            </div>
        );
    }
}

export default SidebarCustomHtmlComponent;
