/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { itemType } from '../../type/MagefanBlog';
import PDPRelatedPosts from './PDPRelatedPosts.component';

/** @namespace Scandiweb/MagefanBlog/Component/PDPRelatedPosts/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    postsCount: state.ConfigReducer.mfblog_product_page_number_of_related_posts
});

/** @namespace Scandiweb/MagefanBlog/Component/PDPRelatedPosts/Container/mapDispatchToProps */
export const mapDispatchToProps = (_dispatch) => ({

});

/** @namespace Scandiweb/MagefanBlog/Component/PDPRelatedPosts/Container/PDPRelatedPostsContainer */
export class PDPRelatedPostsContainer extends PureComponent {
    static propTypes = {
        relatedPosts: PropTypes.arrayOf({
            itemType
        }),
        postsCount: PropTypes.number
    };

    static defaultProps = {
        relatedPosts: [],
        postsCount: 5
    };

    containerFunctions = { };

    containerProps() {
        const { relatedPosts, postsCount } = this.props;

        return { relatedPosts, postsCount };
    }

    render() {
        return (
            <PDPRelatedPosts
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PDPRelatedPostsContainer);
