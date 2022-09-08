/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import './BlogTitle.style';

/** @namespace Scandiweb/MagefanBlog/Component/BlogTitle/Component/BlogTitleComponent */
export class BlogTitleComponent extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired
    };

    renderTitle() {
        const { title } = this.props;

        return (
            <h1 mix={ { block: 'Blog', elem: 'Title' } }>
                    { title }
            </h1>
        );
    }

    render() {
        return this.renderTitle();
    }
}

export default BlogTitleComponent;
