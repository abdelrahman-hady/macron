/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import Html from 'Component/Html';
import Loader from 'Component/Loader';
import CmsPage from 'Route/CmsPage';
import NoMatch from 'Route/NoMatch';

import BlogPost from '../../component/BlogPost';
import BlogPostList from '../../component/BlogPostList';
import BlogTitle from '../../component/BlogTitle';
import Sidebar from '../../component/Sidebar';
import {
    AUTHOR_PAGE_TYPE,
    BLANK_PAGE_TYPE,
    MAIN_PAGE_TYPE,
    PAGE_IDENTIFIER,
    POST_PAGE_TYPE
} from './BlogPage.config';

import './BlogPage.style';

/** @namespace Scandiweb/MagefanBlog/Route/BlogPage/Component/BlogPageComponent */
export class BlogPageComponent extends PureComponent {
    static propTypes = {
        type: PropTypes.string.isRequired,
        displayModeValue: PropTypes.string.isRequired,
        pathId: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        details: PropTypes.shape({
            content: PropTypes.string,
            title: PropTypes.string
        }).isRequired,
        search: PropTypes.string,
        isLoading: PropTypes.bool.isRequired,
        location: PropTypes.shape({
            pathname: PropTypes.string
        }).isRequired,
        match: PropTypes.shape({}).isRequired,
        isAuthorPageEnabled: PropTypes.number.isRequired
    };

    static defaultProps = {
        search: ''
    };

    renderPostList() {
        const {
            pathId,
            type,
            search,
            path
        } = this.props;

        return (
            <BlogPostList
              id={ pathId }
              type={ type }
              search={ search }
              path={ path }
            />
        );
    }

    renderPostPage() {
        const { pathId } = this.props;

        return <BlogPost postId={ pathId } />;
    }

    renderComponent() {
        const {
            type,
            isLoading
        } = this.props;

        if (isLoading) {
            return <Loader />;
        }

        if (type === POST_PAGE_TYPE) {
            return this.renderPostPage();
        }

        return this.renderPostList();
    }

    renderContent() {
        const {
            displayModeValue,
            type,
            location,
            match
        } = this.props;
        const isDisplayModeBlank = displayModeValue === BLANK_PAGE_TYPE;

        if (isDisplayModeBlank && type === MAIN_PAGE_TYPE) {
            return <CmsPage location={ location } match={ match } pageIdentifiers={ PAGE_IDENTIFIER } />;
        }

        return (
            <div block="Blog" elem="Content" className="column">
                { this.renderComponent() }
            </div>
        );
    }

    renderDetails() {
        const { type, details: { content } } = this.props;
        const isTypePost = type === POST_PAGE_TYPE;

        if (isTypePost || !content) {
            return null;
        }

        return (
            <div className={ `${type}-content` }>
                <Html content={ content } />
            </div>
        );
    }

    renderSidebar() {
        return <Sidebar />;
    }

    renderContents() {
        return (
            <div block="Blog" elem="Main" className="columns">
                { this.renderDetails() }
                { this.renderSidebar() }
                { this.renderContent() }
            </div>
        );
    }

    renderTitle() {
        const { details: { title } } = this.props;

        return <BlogTitle title={ title } />;
    }

    renderBlogPage() {
        const {
            pathId, type, isAuthorPageEnabled
        } = this.props;

        if (!pathId || (!isAuthorPageEnabled && type === AUTHOR_PAGE_TYPE)) {
            return <NoMatch />;
        }

        // vvv Why not move it to renver columns
        return (
            <>
                { this.renderTitle() }
                { this.renderContents() }
            </>
        );
    }

    render() {
        return (
            <ContentWrapper mix={ { block: 'Blog' } } label="blogWrapper">
               { this.renderBlogPage() }
            </ContentWrapper>
        );
    }
}

export default BlogPageComponent;
