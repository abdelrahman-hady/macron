/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import ContentWrapper from 'Component/ContentWrapper';

import { itemType } from '../../type/MagefanBlog';
import { parsePostPath } from '../../util/BlogPage';

import './PDPRelatedPosts.style';

/** @namespace Scandiweb/MagefanBlog/Component/PDPRelatedPosts/Component/PDPRelatedPostsComponent */
export class PDPRelatedPostsComponent extends PureComponent {
    static propTypes = {
        relatedPosts: PropTypes.arrayOf({
            itemType
        }).isRequired,
        postsCount: PropTypes.number.isRequired
    };

    renderRelatedPost(post, index) {
        const { postsCount } = this.props;
        const {
            is_active: isActive,
            title,
            post_url: postUrl
        } = post;

        // Might return one less item, needs to be double checked
        if (!isActive || index >= postsCount) {
            return null;
        }

        const url = parsePostPath(postUrl);

        return (
                <li key={ `relatedPost-${title}` }>
                    <Link to={ url }>{ title }</Link>
                </li>
        );
    }

    renderRelatedPosts() {
        const { relatedPosts } = this.props;

        return relatedPosts.map((post, index) => this.renderRelatedPost(post, index));
    }

    render() {
        return (
            <ContentWrapper wrapperMix={ { block: 'PDPRelatedPosts', elem: 'Wrapper' } } label="PDPRelatedPosts">
                <ol>
                    { this.renderRelatedPosts() }
                </ol>
            </ContentWrapper>
        );
    }
}

export default PDPRelatedPostsComponent;
