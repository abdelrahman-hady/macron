/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import Loader from 'Component/Loader';

import defaultImage from '../../style/icons/default-no-image.png';
import { postsType } from '../../type/MagefanBlog';
import { formatDate, parsePostPath } from '../../util/BlogPage';

import './SidebarPostLinked.style';

/** @namespace Scandiweb/MagefanBlog/Component/SidebarPostLinked/Component/SidebarPostLinkedComponent */
export class SidebarPostLinkedComponent extends PureComponent {
    static propTypes = {
        posts: postsType.isRequired,
        displayImage: PropTypes.number.isRequired,
        getClassName: PropTypes.func.isRequired,
        getTitle: PropTypes.func.isRequired,
        isSidebarItemsLoading: PropTypes.bool.isRequired
    };

    renderPostElement(post) {
        const {
            post_id: postId,
            title,
            post_url: postUrl,
            publish_time: publishTime
        } = post;

        return (
            <div className="item clearfix" key={ postId }>
                { this.renderPostImage(post) }
                <div className="post-item-content">
                    <Link className="post-item-link" title={ title } to={ parsePostPath(postUrl) }>
                        { title }
                    </Link>
                        { this.renderPublishDate(publishTime) }
                </div>
            </div>
        );
    }

    renderPostElements(posts) {
        return posts.map((post) => this.renderPostElement(post));
    }

    renderPosts() {
        const { isSidebarItemsLoading } = this.props;

        if (isSidebarItemsLoading) {
            return <Loader />;
        }

        const { posts = [] } = this.props;
        return (
            <div className="block-content">
                { this.renderPostElements(posts) }
            </div>
        );
    }

    renderPublishDate(publishTime) {
        return (
            <div className="post-item-date">
                <span className="value">{ formatDate(publishTime) }</span>
            </div>
        );
    }

    renderPostImage(post) {
        const { displayImage } = this.props;

        if (displayImage !== 1) {
            return null;
        }

        const featuredImage = post.featured_list_image !== 'false' ? post.featured_list_image : post.featured_image;
        const featuredImgAlt = post.featured_list_img_alt ? post.featured_list_img_alt : post.featured_img_alt;
        // TODO: Investigate width and height (they default value is the same here)
        const width = 300;
        const height = 200;
        const featuredImageUrl = featuredImage !== 'false' ? featuredImage : defaultImage;

        return (
            <div className="post-image">
                <Link className="post-item-link" title={ post.title } to={ parsePostPath(post.post_url) }>
                    <img
                      data-width-amp={ width }
                      data-height-amp={ height }
                      layout="responsive"
                      src={ featuredImageUrl }
                      alt={ !featuredImgAlt ? post.title : featuredImgAlt }
                    />
                </Link>
            </div>
        );
    }

    renderTitle() {
        const { getTitle } = this.props;
        return (
            <div className="block-title">
                <strong>{ getTitle() }</strong>
            </div>
        );
    }

    renderContent() {
        const { getClassName } = this.props;

        return (
            <div className={ `widget block ${getClassName()} block-list-posts` }>
                { this.renderTitle() }
                { this.renderPosts() }
            </div>
        );
    }

    render() {
        return (
            <div block="RecentPosts">
                { this.renderContent() }
            </div>
        );
    }
}

export default SidebarPostLinkedComponent;
