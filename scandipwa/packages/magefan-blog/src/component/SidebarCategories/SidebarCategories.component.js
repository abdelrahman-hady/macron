/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import Loader from 'Component/Loader';

import { categoriesType } from '../../type/MagefanBlog';
import { parsePostPath } from '../../util/BlogPage';

import './SidebarCategories.style';

/** @namespace Scandiweb/MagefanBlog/Component/SidebarCategories/Component/SidebarCategoriesComponent */
export class SidebarCategoriesComponent extends PureComponent {
    static propTypes = {
        categories: categoriesType.isRequired,
        categoriesShowPostsCount: PropTypes.number.isRequired,
        isSidebarItemsLoading: PropTypes.bool.isRequired

    };

    renderCategoriesElement({
        category_id: categoryId,
        category_url: categoryUrl,
        title,
        posts_count: postsCount,
        subCategories
    }) {
        return (
            <li key={ categoryId }>
                <Link to={ parsePostPath(categoryUrl) }>
                    { `${title} ` }
                </Link>
                { this.renderPostsCount(postsCount) }
                { this.renderSubCategories(subCategories) }
            </li>
        );
    }

    renderCategoriesElements(categories) {
        return categories.map((category) => this.renderCategoriesElement(category));
    }

    renderCategories() {
        const { isSidebarItemsLoading } = this.props;

        if (isSidebarItemsLoading) {
            return <Loader />;
        }
        const { categories } = this.props;
        if (categories.length < 1) {
            return null;
        }

        return (
            <ul className="accordion">
                { this.renderCategoriesElements(categories) }
            </ul>
        );
    }

    renderSubCategoriesElement({
        category_id: categoryId,
        category_url: categoryUrl,
        title,
        posts_count: postsCount,
        subCategories
    }) {
        return (
            <li key={ categoryId }>
                <Link to={ parsePostPath(categoryUrl) }>
                    { `${title} ` }
                </Link>
                { this.renderPostsCount(postsCount) }
                { this.renderSubCategories(subCategories) }
            </li>
        );
    }

    renderSubCategoriesElements(categories) {
        return categories.map((category) => this.renderSubCategoriesElement(category));
    }

    renderSubCategories(categories) {
        if (categories.length < 1) {
            return null;
        }

        return (
            <ul>
                { this.renderSubCategoriesElements(categories) }
            </ul>
        );
    }

    renderPostsCount(postsCount) {
        const { categoriesShowPostsCount } = this.props;

        if (categoriesShowPostsCount === 1) {
            return (
                <>
                    (
                    { postsCount > 0 ? postsCount : 0 }
                    )
                </>
            );
        }

        return null;
    }

    renderTitle() {
        return (
            <div className="block-title">
                <strong>{ __('Categories') }</strong>
            </div>
        );
    }

    render() {
        return (
            <div block="widget block block-categories">
                { this.renderTitle() }
                { this.renderCategories() }
            </div>
        );
    }
}

export default SidebarCategoriesComponent;
