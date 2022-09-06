/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import Html from 'Component/Html';

import { itemType } from '../../type/MagefanBlog';
import { parsePostPath } from '../../util/BlogPage';
import BlogPostInfo from '../BlogPostInfo';

import './BlogPostListItem.style';

/** @namespace Scandiweb/MagefanBlog/Component/BlogPostListItem/Component/BlogPostListItemComponent */
export class BlogPostListItemComponent extends PureComponent {
    static propTypes = {
        item: itemType.isRequired
    };

    renderReadMore() {
        const { item: { post_url } } = this.props;
        const url = parsePostPath(post_url);

        return (
            <Link to={ url } className="post-read-more">
                { __('Read more »') }
            </Link>
        );
    }

    renderImage() {
        const {
            item:
            {
                featured_image,
                featured_img_alt,
                featured_list_img_alt,
                title,
                post_url
            }
        } = this.props;
        const url = parsePostPath(post_url);
        const imgAlt = featured_list_img_alt || featured_img_alt || title;

        // * vvv sometime it's false so we need to check it
        if (!featured_image || featured_image.toLowerCase() === 'false') {
            return null;
        }

        return (
            <div className="post-ftimg-hld">
                <Link to={ url }>
                    <img src={ featured_image } alt={ imgAlt } />
                </Link>
            </div>
        );
    }

    renderContent() {
        const { item: { short_content, short_filtered_content } } = this.props;

        return (
            <>
                { this.renderImage() }
                <div className="post-text-hld clearfix">
                    <Html content={ short_content || short_filtered_content } />
                </div>
            </>
        );
    }

    renderPost() {
        return (
            <div className="post-content">
                <div className="post-description clearfix">
                    { this.renderContent() }
                    { this.renderReadMore() }
                </div>
            </div>
        );
    }

    renderInfo() {
        const {
            item: {
                publish_time: publishTime,
                categories,
                comments_count: commentsCount,
                post_url: postUrl,
                tags,
                author
            }
        } = this.props;

        const postInfo = {
            publishTime,
            categories,
            commentsCount,
            postUrl,
            tags,
            author: {
                name: author === null ? '' : author.name,
                authorUrl: author === null ? '' : author.author_url
            }
        };

        return <BlogPostInfo postInfo={ postInfo } />;
    }

    renderTitle() {
        const { item: { title, post_url } } = this.props;
        const url = parsePostPath(post_url);

        return (
            <div className="post-title-holder">
                <h2 className="post-title">
                    <Link className="post-item-link" to={ url }>
                        { title }
                    </Link>
                </h2>
            </div>
        );
    }

    renderHeader() {
        return (
            <div className="post-header">
                { this.renderTitle() }
                { this.renderInfo() }
            </div>
        );
    }

    renderFooter() {
        return <div className="post-footer" />;
    }

    renderPostItem() {
        const { item: { post_id, is_active } } = this.props;

        if (!is_active) {
            return null;
        }

        return (
            <li className={ `post-holder post-holder-${post_id}` }>
                { this.renderHeader() }
                { this.renderPost() }
                { this.renderFooter() }
            </li>
        );
    }

    render() {
        return (
            <>
                { this.renderPostItem() }
            </>
        );
    }
}

export default BlogPostListItemComponent;
