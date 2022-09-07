/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import Menu from 'Component/Menu';

import { MagefanBlogContext } from '../context/MagefanBlog';

const addContextToHeaderMenu = (args, callback, instance) => {
    const { isCheckout, device: { isMobile } } = instance.props;

    if (isMobile || isCheckout) {
        return null;
    }

    return (
        <MagefanBlogContext.Consumer>
            { (value) => (<Menu context={ value } />) }
        </MagefanBlogContext.Consumer>
    );
};

const addContextToMenuPage = () => (
        <MagefanBlogContext.Consumer>
            { (value) => (
                    <main block="MenuPage">
                        <Menu context={ value } />
                    </main>
            ) }
        </MagefanBlogContext.Consumer>
);

const filterCategories = (categories, parentCategoryId = 0, categoriesMaxDepth, depth = 1) => {
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
                ? [] : filterCategories(categories, category.category_id, categoriesMaxDepth, depth + 1)
        }
    ));
};

const formatCategory = (category, index) => {
    const {
        subCategories, is_active, title, category_url_path, category_id
    } = category;

    return {
        children: { ...subCategories?.map((cat) => formatCategory(cat, index - 1)) },
        icon: '',
        is_active,
        item_class: '',
        item_id: `blog-category-${category_id}`,
        parent_id: 1,
        position: category_id,
        title,
        url: {
            pathname: `/${category_url_path}`,
            search: '',
            state: {
                category: category_id
            }
        }

    };
};

const getCategories = (includeCategories, categories, index) => {
    if (!includeCategories || !categories.length) {
        return [];
    }
    const formattedCategories = categories.map((categories) => formatCategory(categories, index - 1));

    return { ...formattedCategories };
};

const addMenuItem = (args, callback, instance) => {
    const containerProps = callback(...args);
    const { menu } = containerProps;
    const {
        props: {
            context: { sidebarCategories: categories = [] } = {},
            mfblog_top_menu_show_item,
            mfblog_top_menu_item_text,
            mfblog_top_menu_include_categories,
            mfblog_top_menu_max_depth
        }
    } = instance;

    if (menu[1] === undefined || !mfblog_top_menu_show_item) {
        return containerProps;
    }

    const filteredCategories = filterCategories(categories, 0, mfblog_top_menu_max_depth);
    const BLOG_INDEX = 98;

    const blogMenuItemChildren = getCategories(mfblog_top_menu_include_categories, filteredCategories, BLOG_INDEX);

    const blogMenuItem = {
        [BLOG_INDEX]: {
            children: { ...blogMenuItemChildren },
            icon: '',
            is_active: true,
            item_class: '',
            item_id: '420',
            parent_id: 1,
            position: 420,
            title: `${mfblog_top_menu_item_text}`,
            url: {
                pathname: '/blog', // Can be modified with permalinks
                search: '',
                state: {
                    category: 420
                }
            }

        }
    };

    const { children } = menu[1];

    menu[1].children = { ...children, ...blogMenuItem };

    containerProps.menu = menu;

    return containerProps;
};

const mapStateToProps = (args, callback) => {
    const {
        ConfigReducer
    } = args[0];

    const {
        mfblog_top_menu_show_item,
        mfblog_top_menu_item_text,
        mfblog_top_menu_include_categories,
        mfblog_top_menu_max_depth
    } = ConfigReducer;

    return {
        ...callback(...args),
        mfblog_top_menu_show_item,
        mfblog_top_menu_item_text,
        mfblog_top_menu_include_categories,
        mfblog_top_menu_max_depth
    };
};

export default {
    'Component/Header/Component': {
        'member-function': {
            renderMenu: addContextToHeaderMenu
        }
    },

    'Route/MenuPage/Container': {
        'member-function': {
            render: addContextToMenuPage
        }
    },
    'Component/Menu/Container': {
        'member-function': {
            containerProps: addMenuItem
        }
    },
    'Component/Menu/Container/mapStateToProps': {
        function: mapStateToProps
    }
};
