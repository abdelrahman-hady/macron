/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { MagefanBlogContext } from '../../context/MagefanBlog';
import SidebarCategories from './SidebarCategories.component';

/** @namespace Scandiweb/MagefanBlog/Component/SidebarCategories/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    categoriesShowPostsCount: state.ConfigReducer.mfblog_sidebar_categories_show_posts_count,
    categoriesMaxDepth: state.ConfigReducer.mfblog_sidebar_categories_max_depth
});

/** @namespace Scandiweb/MagefanBlog/Component/SidebarCategories/Container/mapDispatchToProps */
export const mapDispatchToProps = (_dispatch) => ({});

/** @namespace Scandiweb/MagefanBlog/Component/SidebarCategories/Container/SidebarCategoriesContainer */
export class SidebarCategoriesContainer extends PureComponent {
    static propTypes = {
        categoriesShowPostsCount: PropTypes.number.isRequired,
        categoriesMaxDepth: PropTypes.number.isRequired
    };

    static contextType = MagefanBlogContext;

    containerFunctions = {
    };

    containerProps() {
        const { isSidebarItemsLoading } = this.context;
        const { categoriesShowPostsCount } = this.props;
        return {
            categories: this.filterCategories(0, 1),
            categoriesShowPostsCount,
            isSidebarItemsLoading
        };
    }

    filterCategories(parentCategoryId, depth) {
        const { sidebarCategories: categories } = this.context;
        const { categoriesMaxDepth } = this.props;
        const filteredCategories = categories.filter((category) => {
            if (category.parent_category_id === parentCategoryId) {
                return true;
            }

            return false;
        });

        return filteredCategories.map((category) => (
            {
                ...category,
                subCategories: (categoriesMaxDepth > 0 && depth >= categoriesMaxDepth)
                    ? [] : this.filterCategories(category.category_id, depth + 1)
            }
        ));
    }

    render() {
        return (
            <SidebarCategories
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarCategoriesContainer);
