/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Loader from 'Component/Loader';
import Pagination from 'Component/Pagination';

import { itemType } from '../../type/MagefanBlog';
import BlogPostListItem from '../BlogPostListItem';
import { DEFAULT, LIST_MODERN } from './BlogPostList.config';

import './BlogPostList.style';

/** @namespace Scandiweb/MagefanBlog/Component/BlogPostList/Component/BlogPostListComponent */
export class BlogPostListComponent extends PureComponent {
    static propTypes = {
        indexTemplate: PropTypes.string.isRequired,
        listTemplate: PropTypes.string.isRequired,
        isLoading: PropTypes.bool.isRequired,
        blogPosts: PropTypes.shape({
            items: PropTypes.arrayOf(itemType),
            total_count: PropTypes.number,
            total_pages: PropTypes.number
        })

    };

    static defaultProps = {
        blogPosts: {
            items: [],
            total_count: 5,
            total_pages: 0
        }
    };

    renderMap = {
        [DEFAULT]: this.renderDefaultItems.bind(this),
        [LIST_MODERN]: this.renderModernItems.bind(this)
    };

    renderDefaultItem(item) {
        return <BlogPostListItem item={ item } key={ item.post_id } />;
    }

    renderDefaultItems() {
        const { blogPosts: { items } } = this.props;

        return items.map((item) => this.renderDefaultItem(item));
    }

    renderModernItems() {
        return (
            <>
                <p>{ __('Currently "Modern (List)" template is not supported by ScandiPWA.') }</p>
                <p>{ __('Please switch to "default" (a.k.a system settings) template') }</p>
            </>

        );
    }

    renderPager() {
        const { blogPosts: { total_pages } } = this.props;

        return <Pagination totalPages={ total_pages } />;
    }

    renderPosts() {
        const {
            blogPosts: { items }, indexTemplate, listTemplate
        } = this.props;
        const template = listTemplate || indexTemplate;

        if (!items?.length) {
            return (
                <div className="message info empty">
                    { __('We can\'t find posts matching the selection.') }
                </div>
            );
        }

        return (
            <div className="post-list-wrapper">
                <ol className="post-list">
                    { this.renderMap[template]() || this.renderMap[DEFAULT]() }
                </ol>
            </div>
        );
    }

    render() {
        const { isLoading } = this.props;

        if (isLoading) {
            return <Loader />;
        }

        return (
            <div>
                { this.renderPosts() }
                { this.renderPager() }
            </div>
        );
    }
}

export default BlogPostListComponent;
