/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { prepareQuery } from 'Util/Query';
import { executeGet } from 'Util/Request';
import { DataContainer } from 'Util/Request/DataContainer';

import BlogPostsQuery from '../../query/BlogPosts.query';
import {
    DISPLAY_MODE_FEATURED_POSTS,
    DISPLAY_MODE_RECENT_POSTS,
    MAIN_PAGE_TYPE
} from '../../route/BlogPage/BlogPage.config';
import { getFilterKeyByLabel, getIndexPageDisplayMode } from '../../util/BlogPage';
import { ONE_MONTH_IN_SECONDS } from '../BlogPost/BlogPost.config';
import BlogPostList from './BlogPostList.component';
import { POST_ID, SEARCH_STRING } from './BlogPostList.config';

/** @namespace Scandiweb/MagefanBlog/Component/BlogPostList/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    postsPerPage: state.ConfigReducer.mfblog_post_list_posts_per_page,
    indexTemplate: state.ConfigReducer.mfblog_index_page_template,
    listTemplate: state.ConfigReducer.mfblog_post_list_template,
    sort: state.ConfigReducer.mfblog_index_page_posts_sort_by, // returns 0,1,2
    displayMode: state.ConfigReducer.mfblog_index_page_display_mode,
    featuredPostIDs: state.ConfigReducer.mfblog_index_page_post_ids
});

/** @namespace Scandiweb/MagefanBlog/Component/BlogPostList/Container/mapDispatchToProps */
export const mapDispatchToProps = (_dispatch) => ({});

/** @namespace Scandiweb/MagefanBlog/Component/BlogPostList/Container/BlogPostListContainer */
export class BlogPostListContainer extends DataContainer {
    static propTypes = {
        pageSize: PropTypes.number,
        indexTemplate: PropTypes.string,
        listTemplate: PropTypes.string,
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        displayModeValue: PropTypes.string,
        featuredPostIDs: PropTypes.string
    };

    static defaultProps = {
        pageSize: 5,
        indexTemplate: 'default',
        listTemplate: 'default',
        featuredPostIDs: '',
        displayModeValue: DISPLAY_MODE_RECENT_POSTS
    };

    __construct(props) {
        super.__construct(props);

        this.state = {
            blogPosts: {},
            pagination: this.getPaginationNumber(),
            pageSize: props.postsPerPage,
            isLoading: true
        };
        this.getPosts();
    }

    componentDidUpdate(prevProps, prevState) {
        const { search: prevSearch, type: prevType, id: prevId } = prevProps;
        const { search, type, id } = this.props;
        const { pagination: prevPagination } = prevState;
        const { pagination } = this.state;

        if (prevSearch !== search) {
            const pagination = this.getPaginationNumber();
            this.setState({ pagination });
        }

        // vvv If pagination value, page type or id is changed gets according posts
        if (
            prevPagination !== pagination
            || prevType !== type
            || prevId !== id
        ) {
            this.getPosts();
        }
    }

    getPaginationNumber() {
        const { search } = this.props;
        const pageNumber = search?.split(SEARCH_STRING)[1] || 1;

        return pageNumber;
    }

    prepareFilter() {
        const {
            id,
            type,
            displayMode,
            featuredPostIDs
        } = this.props;

        const filterName = getFilterKeyByLabel[type] ?? MAIN_PAGE_TYPE;
        const displayModeValue = getIndexPageDisplayMode(displayMode);
        const featurePostIDsArray = featuredPostIDs.split(',');

        if (filterName === MAIN_PAGE_TYPE) {
            if (displayModeValue === DISPLAY_MODE_FEATURED_POSTS) {
                return {
                    [POST_ID]: {
                        in: featurePostIDsArray
                    }
                };
            }

            // vvv When undefined, no filter is applied to query
            return undefined;
        }

        if (filterName === 'search') {
            return {
                [filterName]: {
                    like: id
                }
            };
        }

        if (filterName === 'publish_time') {
            return {
                // vvv Returns starting and ending dates, id contains month and year
                //! vvv Posts published on 31th of a month will be excluded, "to"'s day needs workaround
                [filterName]: {
                    from: `${id}-1 00:00:00`,
                    to: `${id}-30 23:59:59`
                }
            };
        }

        const filter = {
            [filterName]: {
                eq: id
            }
        };

        return filter;
    }

    getSortField(type, sortField) {
        if (type !== MAIN_PAGE_TYPE) {
            return undefined;
        }

        if (sortField === 0) {
            return 'publish_time';
        }

        if (sortField === 1) {
            return 'position';
        }

        return 'title';
    }

    getSort(type, sort) {
        if (type !== MAIN_PAGE_TYPE) {
            return undefined;
        }

        if (sort === 0) {
            return ['DESC'];
        }

        return ['ASC'];
    }

    async getPosts() {
        const { pageSize, pagination, isLoading } = this.state;
        const { type, sort: indexPageSort } = this.props;

        if (!isLoading) {
            this.setState({ isLoading: true });
        }

        const sortField = this.getSortField(type, indexPageSort);
        const sort = this.getSort(type, indexPageSort);
        const currentPage = pagination;
        const filter = this.prepareFilter();
        const query = BlogPostsQuery.getBlogPosts({
            filter, pageSize, currentPage, sort, sortField
        });

        // TODO: convert item contents to camelCase when requesting

        try {
            const {
                blogPosts
            } = await executeGet(prepareQuery(query), 'MagefanBlogPostList', ONE_MONTH_IN_SECONDS);

            this.setState({ blogPosts, isLoading: false });
        } catch (_error) {
            this.setState({ isLoading: false });
        }
    }

        containerFunctions = { };

        containerProps() {
            const {
                blogPosts,
                pagination,
                isLoading
            } = this.state;
            const {
                pageSize,
                indexTemplate,
                listTemplate
            } = this.props;

            return {
                blogPosts,
                pagination,
                pageSize,
                indexTemplate,
                listTemplate,
                isLoading
            };
        }

        render() {
            return (
            <BlogPostList
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
            );
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostListContainer);
