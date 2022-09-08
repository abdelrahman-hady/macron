/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';
import { Fragment, PureComponent } from 'react';
import { Link } from 'react-router-dom';

import { postInfoType } from '../../type/MagefanBlog';
import { formatDate, parsePostPath } from '../../util/BlogPage';
import { COMMENTS_TEMPLATE_TYPE_DISABLED } from '../BlogPost/BlogPost.config';

import './BlogPostInfo.style';

/** @namespace Scandiweb/MagefanBlog/Component/BlogPostInfo/Component/BlogPostInfoComponent */
export class BlogPostInfoComponent extends PureComponent {
    static propTypes = {
        commentsTemplateType: PropTypes.string.isRequired,
        postInfo: postInfoType.isRequired,
        isAuthorEnable: PropTypes.bool.isRequired,
        isAuthorPage: PropTypes.bool.isRequired

    };

    renderViews() {
        const { postInfo: { viewsCount } } = this.props;

        // ! vvv It's disabled since we're not supporting it, because we're caching the post
        // TODO get this value form ConfigReducer instead of hard coding it ;)
        const isViewCountEnable = false;
        if (!isViewCountEnable) {
            return null;
        }
        // ! ^^^ It's disabled since we're not supporting it, because we're caching the post

        if (!viewsCount) {
            return null;
        }

        return (
            <div className="item post-views">
                <i className="mf-blog-icon mfbi-views" />
                <span className="label">{ __('Views:') }</span>
                <span className="value">{ viewsCount }</span>
            </div>
        );
    }

    renderAuthor() {
        const {
            isAuthorEnable,
            isAuthorPage,
            postInfo: { author: { name, authorUrl } }
        } = this.props;

        if (!isAuthorEnable) {
            return null;
        }

        if (!name) {
            return null;
        }

        const url = parsePostPath(authorUrl);

        if (!isAuthorPage) {
            return (
                <div className="item post-author">
                    <i className="mf-blog-icon mfbi-user" />
                    <span className="label">{ __('Author:') }</span>
                    <span className="value">
                        <span>{ name }</span>
                    </span>
                </div>
            );
        }

        return (
            <div className="item post-author">
                <i className="mf-blog-icon mfbi-user" />
                <span className="label">{ __('Author:') }</span>
                <span className="value">
                    <Link to={ url }>{ name }</Link>
                </span>
            </div>
        );
    }

    renderTagElement(tag, index) {
        const { postInfo: { tags } } = this.props;
        const tagsCount = tags.length;
        const { title, tag_url: tagUrl, tag_id: tagId } = tag;
        const url = parsePostPath(tagUrl);

        return (
            <Fragment key={ `tagKey${tagId}` }>
                <Link to={ url }>{ title }</Link>
                { index + 1 < tagsCount && ',' }
            </Fragment>
        );
    }

    renderTagElements() {
        const { postInfo: { tags } } = this.props;

        return tags.map((tag, index) => this.renderTagElement(tag, index));
    }

    renderTags() {
        const { postInfo: { tags } } = this.props;

        if (tags.length < 1) {
            return null;
        }

        const renderedTags = this.renderTagElements();

        return (
            <div className="item post-tags">
                <i className="mf-blog-icon mfbi-tags" />
                <span className="label">{ __('Tags:') }</span>
                { renderedTags }
            </div>
        );
    }

    renderComments() {
        const { commentsTemplateType, postInfo: { commentsCount, postUrl } } = this.props;

        if (commentsTemplateType === COMMENTS_TEMPLATE_TYPE_DISABLED) {
            return null;
        }

        if (!commentsCount) {
            return null;
        }

        const url = parsePostPath(postUrl);

        return (
            <div className="item post-comments">
                <i className="mf-blog-icon mfbi-comments" />
                <span className="label">{ __('Comments:') }</span>
                <Link to={ `${url}#post-comments` }>{ commentsCount }</Link>
            </div>
        );
    }

    renderCategoryTitle(category, index) {
        const { postInfo: { categories } } = this.props;
        const categoriesCount = categories.length;
        const { title, category_url: categoryUrl } = category;
        const url = parsePostPath(categoryUrl);

        return (
            <Fragment key={ `categoryKey${category.category_id}` }>
                <Link to={ url }>{ title }</Link>
                { index + 1 < categoriesCount && ',' }
            </Fragment>
        );
    }

    renderCategoryTitles() {
        const { postInfo: { categories } } = this.props;

        return categories.map((category, index) => this.renderCategoryTitle(category, index));
    }

    renderCategories() {
        const { postInfo: { categories } } = this.props;

        if (categories.length < 1) {
            return null;
        }

        return (
            <div className="item post-categories">
                <i className="mf-blog-icon mfbi-folder" />
                <span className="label">{ __('Categories:') }</span>
                { this.renderCategoryTitles() }
            </div>
        );
    }

    renderDate() {
        const { postInfo: { publishTime } } = this.props;

        if (publishTime.length < 1) {
            return null;
        }

        return (
            <div className="item post-posed-date">
                <i className="mf-blog-icon mfbi-calendar" />
                <span className="label">
                    { __('Posted:') }
                </span>
                <span className="value">
                    { formatDate(publishTime) }
                </span>
            </div>
        );
    }

    render() {
        return (
            <div className="post-info">
                { this.renderDate() }
                { this.renderCategories() }
                { this.renderComments() }
                { this.renderTags() }
                { this.renderAuthor() }
                { this.renderViews() }
            </div>
        );
    }
}

export default BlogPostInfoComponent;
