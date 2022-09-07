/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateMeta } from 'Store/Meta/Meta.action';
import { prepareQuery } from 'Util/Query';
import { executeGet } from 'Util/Request';
import { DataContainer } from 'Util/Request/DataContainer';

import { ONE_MONTH_IN_SECONDS } from '../../component/BlogPost/BlogPost.config';
import BlogPathValidityQuery from '../../query/BlogPathValidity.query';
import { getIndexPageDisplayMode } from '../../util/BlogPage';
import Blog from './BlogPage.component';
import {
    ALL,
    AUTHOR_TYPE, BLOG_INDEX, CATEGORY_TYPE,
    MAIN_PAGE_TYPE
} from './BlogPage.config';

/** @namespace Scandiweb/MagefanBlog/Route/BlogPage/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    displayMode: state.ConfigReducer.mfblog_index_page_display_mode,
    blogTitle: state.ConfigReducer.mfblog_index_page_title,
    template: state.ConfigReducer.mfblog_index_page_template,
    postsSortBy: state.ConfigReducer.mfblog_index_page_posts_sort_by,
    metaTitle: state.ConfigReducer.mfblog_index_page_meta_title,
    metaKeywords: state.ConfigReducer.mfblog_index_page_meta_keywords,
    metaDescription: state.ConfigReducer.mfblog_index_page_meta_description,
    canonical: state.ConfigReducer.mfblog_seo_use_canonical_meta_tag_for,
    isAuthorPageEnabled: state.ConfigReducer.mfblog_author_page_enabled

});

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

export const NoMatchDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/NoMatch/NoMatch.dispatcher'
);

/** @namespace Scandiweb/MagefanBlog/Route/BlogPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.then(
            ({ default: dispatcher }) => dispatcher.update(breadcrumbs, dispatch)
        );
    }
});

/** @namespace Scandiweb/MagefanBlog/Route/BlogPage/Container/BlogPageContainer */
export class BlogPageContainer extends DataContainer {
static propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string
    }).isRequired,
    displayMode: PropTypes.string,
    template: PropTypes.string,
    blogTitle: PropTypes.string,
    postsSortBy: PropTypes.number,
    metaTitle: PropTypes.string,
    metaKeywords: PropTypes.string,
    metaDescription: PropTypes.string
};

static defaultProps = {

};

__construct(props) {
    super.__construct(props);

    this.state = {
        path: {
            path: props.location.pathname,
            pathId: '0',
            type: MAIN_PAGE_TYPE,
            details: {
                title: props.blogTitle
            },
            breadcrumbs: []
        },
        isLoading: true,
        displayModeValue: getIndexPageDisplayMode(props.displayMode),
        canonical: props.canonical?.split(',') || []
    };

    this.checkPathValidity();
    this.updateMeta();
    this.updateBreadcrumbs();
    this.scrollToTop();
}

componentDidUpdate(prevProps, prevState) {
    const {
        location: {
            pathname: prevPathName,
            search: prevSearch
        }
    } = prevProps;
    const {
        location: {
            pathname: newPath,
            search: newSearch
        }
    } = this.props;
    const {
        path: {
            pathId,
            type,
            details: {
                title: newTitle
            }
        },
        breadcrumbs: newBreadcrumbs
    } = this.state;
    const {
        path: {
            pathId: prevPathId,
            type: prevType,
            details: {
                title: prevTitle
            }
        },
        breadcrumbs: prevBreadcrumbs
    } = prevState;

    if (prevPathName !== newPath) {
        this.checkPathValidity();
        this.scrollToTop();
    }

    if (
        (pathId !== prevPathId
            || type !== prevType)
            && pathId !== null
    ) {
        this.updateMeta();
    }

    // vvv Check if pagination is updated in url
    if (prevSearch !== newSearch) {
        this.updateSearch(newSearch);
        this.scrollToTop();
    }

    if (prevBreadcrumbs !== newBreadcrumbs
            || prevTitle !== newTitle) {
        this.updateBreadcrumbs();
    }
}

    containerFunctions = { };

    updateMeta() {
        const {
            updateMeta,
            metaTitle,
            metaDescription,
            metaKeywords
        } = this.props;

        const {
            path: {
                details: {
                    canonicalUrl
                },
                type
            },
            canonical
        } = this.state;
        const isCanonicalForType = canonical.indexOf(type) > -1;
        const isCanonicalForAll = canonical.indexOf(ALL) > -1;

        // vvv canonical contains list of types where canonical meta is enabled
        // vvv if the current type is included or 'all' is set, canonical url is assigned
        const addCanonical = (isCanonicalForType
                            || isCanonicalForAll ? canonicalUrl : '');

        updateMeta({
            title: metaTitle,
            description: metaDescription,
            keywords: metaKeywords,
            canonical_url: addCanonical
        });
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    updateBreadcrumbs() {
        const {
            updateBreadcrumbs,
            blogTitle,
            isAuthorPageEnabled
        } = this.props;
        const {
            path: {
                path,
                pathId,
                type,
                details: {
                    title
                }
            }, breadcrumbs
        } = this.state;
        const convertedBreadcrumbs = [];

        // Convert type breadcrumbs content to scandipwa breadcrumbs format, if any.
        const categoryBreadcrumbs = breadcrumbs?.map((item) => ({
            url: item.category_url_path,
            name: item.category_name,
            order: item.category_level
        })) || [];

        // vvv If page is not index, adds index page title step to nested breadcrumbs.
        // vvv otherwise, it is added in next if statement
        if (type !== MAIN_PAGE_TYPE) {
            // first element is always '/', so we take second element
            const blogPath = `/${path.split('/')[1]}`;
            convertedBreadcrumbs.push({ name: blogTitle, url: blogPath });
        }

        convertedBreadcrumbs.push(...categoryBreadcrumbs);

        // * If type is other then category, converted breadcrumbs might include only blog step or be empty
        // vvv Adds first/last destination of breadcrumbs (index page title, author, tag, post title)
        if (type !== CATEGORY_TYPE) {
            convertedBreadcrumbs.push({ name: title, order: -1 });
        }

        // * Breadcrumbs are applied in reverse order, so array needs to be reversed beforehand
        convertedBreadcrumbs.reverse();

        if (!pathId || (!isAuthorPageEnabled && type === AUTHOR_TYPE)) {
            return;
        }

        updateBreadcrumbs(convertedBreadcrumbs);
    }

    updateSearch(search) {
        const { path } = this.state;

        this.setState({ path: { ...path, search } });
    }

    async checkPathValidity() {
        const { location: { pathname, search } } = this.props;
        const query = BlogPathValidityQuery.getPathValidity(pathname);

        this.setState({ isLoading: true });

        const { sw_blogPath: blogPath } = await executeGet(
            prepareQuery(query), 'MagefanBlogPagePath', ONE_MONTH_IN_SECONDS
        );

        const {
            id,
            type,
            details,
            details: {
                title: resultTitle,
                breadcrumbs = []
            }
        } = blogPath;

        const { blogTitle } = this.props;
        const title = resultTitle !== MAIN_PAGE_TYPE ? resultTitle : blogTitle;
        const { href } = window.location;

        this.setState({
            path: {
                path: pathname,
                pathId: id,
                type: type !== BLOG_INDEX ? type : MAIN_PAGE_TYPE,
                search,
                details: {
                    // vvv Destructure content, meta, opengraph, breadcrumbs
                    ...details,
                    title,
                    canonicalUrl: href
                }
            },
            isLoading: false,
            breadcrumbs
        });
    }

    containerProps() {
        const {
            path: {
                search,
                path,
                pathId,
                type,
                details
            },
            displayModeValue,
            isLoading
        } = this.state;
        const {
            template,
            location,
            match,
            isAuthorPageEnabled
        } = this.props;

        return {
            type,
            details,
            search,
            pathId,
            path,
            displayModeValue,
            template,
            isLoading,
            location,
            match,
            isAuthorPageEnabled
        };
    }

    render() {
        return (
            <Blog
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPageContainer);
