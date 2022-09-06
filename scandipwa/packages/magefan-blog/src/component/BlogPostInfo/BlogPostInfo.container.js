/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { postInfoType } from '../../type/MagefanBlog';
import { convertNumToBool } from '../../util/BlogPage';
import BlogPostInfo from './BlogPostInfo.component';

/** @namespace Scandiweb/MagefanBlog/Component/BlogPostInfo/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isAuthorEnable: state.ConfigReducer.mfblog_author_enabled,
    isAuthorPage: state.ConfigReducer.mfblog_author_page_enabled
});

/** @namespace Scandiweb/MagefanBlog/Component/BlogPostInfo/Container/mapDispatchToProps */
export const mapDispatchToProps = (_dispatch) => ({});

/** @namespace Scandiweb/MagefanBlog/Component/BlogPostInfo/Container/BlogPostInfoContainer */
export class BlogPostInfoContainer extends PureComponent {
    static propTypes = {
        commentsTemplateType: PropTypes.string.isRequired,
        postInfo: postInfoType.isRequired,
        isAuthorEnable: PropTypes.number.isRequired,
        isAuthorPage: PropTypes.number.isRequired
    };

    containerFunctions = {};

    containerProps() {
        const {
            postInfo,
            commentsTemplateType,
            isAuthorEnable,
            isAuthorPage
        } = this.props;

        return {
            postInfo,
            commentsTemplateType,
            isAuthorEnable: convertNumToBool(isAuthorEnable),
            isAuthorPage: convertNumToBool(isAuthorPage)
        };
    }

    render() {
        return (
            <BlogPostInfo
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostInfoContainer);
