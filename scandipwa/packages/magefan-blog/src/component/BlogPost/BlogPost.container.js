/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { ProductType } from 'Type/ProductList.type';
import { prepareQuery } from 'Util/Query';
import { executeGet } from 'Util/Request';

import BlogPostQuery from '../../query/BlogPost.query';
import { convertNumToBool } from '../../util/BlogPage';
import BlogPost from './BlogPost.component';
import { ONE_MONTH_IN_SECONDS, OPEN_GRAPH_HEADER_PREFIX } from './BlogPost.config';

export const ProductListDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/ProductList/ProductList.dispatcher'
);

/** @namespace Scandiweb/MagefanBlog/Component/BlogPost/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    isNextPrevEnabled: state.ConfigReducer.mfblog_post_view_nextprev_enabled,
    isRelatedPostsEnabled: state.ConfigReducer.mfblog_post_view_related_posts_enabled,
    isRelatedProductsEnabled: state.ConfigReducer.mfblog_post_view_related_products_enabled,
    numberOfRelatedPosts: state.ConfigReducer.mfblog_post_view_related_posts_number_of_posts,
    numberOfRelatedProducts: state.ConfigReducer.mfblog_post_view_related_products_number_of_products,
    relatedProducts: state.ProductListReducer.pages['1'] || [],
    commentsTemplateType: state.ConfigReducer.mfblog_post_view_comments_type

});

/** @namespace Scandiweb/MagefanBlog/Component/BlogPost/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    requestProductList: (options) => ProductListDispatcher.then(
        ({ default: dispatcher }) => dispatcher.handleData(dispatch, options)
    )
});

/** @namespace Scandiweb/MagefanBlog/Component/BlogPost/Container/BlogPostContainer */
export class BlogPostContainer extends PureComponent {
    static propTypes = {
        postId: PropTypes.string.isRequired,
        isNextPrevEnabled: PropTypes.number.isRequired,
        isRelatedPostsEnabled: PropTypes.number.isRequired,
        numberOfRelatedPosts: PropTypes.number.isRequired,
        isRelatedProductsEnabled: PropTypes.number.isRequired,
        numberOfRelatedProducts: PropTypes.number.isRequired,
        requestProductList: PropTypes.func.isRequired,
        relatedProducts: PropTypes.arrayOf(ProductType).isRequired,
        commentsTemplateType: PropTypes.string.isRequired
    };

    openGraphMetaMap = [
        {
            name: 'type',
            property: 'og:type',
            getContent: () => {
                const { post: { og_type: ogType } } = this.state;
                return ogType;
            }
        },
        {
            name: 'title',
            property: 'og:title',
            getContent: () => {
                const { post: { og_title: ogTitle } } = this.state;
                return ogTitle;
            }
        },
        {
            name: 'description',
            property: 'og:description',
            getContent: () => {
                const { post: { og_description: ogDescription } } = this.state;
                return ogDescription;
            }
        },
        {
            name: 'url',
            property: 'og:url',
            getContent: () => window.location.href
        },
        {
            name: 'image',
            property: 'og:image',
            getContent: () => {
                const { post: { og_image: ogImage, featured_image: featuredImage } } = this.state;
                if (!ogImage || ogImage.toLowerCase() === 'false') {
                    if (!featuredImage || featuredImage.toLowerCase() === 'false') {
                        return false;
                    }

                    return featuredImage;
                }

                return ogImage;
            }
        }
    ];

    containerFunctions = { };

    componentDidUpdate(prevProps) {
        const { postId: prevId } = prevProps;
        const { postId: id } = this.props;
        const { needToApplyOpenGraphMetas, isLoading } = this.state;

        if (prevId !== id) {
            this.setState({
                isLoading: true,
                post: {}
            });

            this.getPost();
        }
        if (needToApplyOpenGraphMetas && !isLoading) {
            this.addOpenGraphMeta();
        }
    }

    componentWillUnmount() {
        this.removeOpenGraphMeta();
    }

    __construct(props) {
        super.__construct(props);

        this.state = {
            openGraphMetasElements: [],
            isLoading: true,
            post: {},
            isRelatedProductsLoading: true,
            needToApplyOpenGraphMetas: true
        };

        this.getPost();
    }

    containerProps() {
        const { post, isLoading, isRelatedProductsLoading } = this.state;
        const {
            isNextPrevEnabled,
            isRelatedPostsEnabled,
            isRelatedProductsEnabled,
            relatedProducts = [],
            commentsTemplateType
        } = this.props;

        return {
            post,
            isLoading,
            isNextPrevEnabled: convertNumToBool(isNextPrevEnabled),
            isRelatedProductsEnabled: convertNumToBool(isRelatedProductsEnabled),
            isRelatedPostsEnabled: convertNumToBool(isRelatedPostsEnabled),
            relatedProducts: post.related_products?.length < 1 ? [] : relatedProducts,
            isRelatedProductsLoading,
            commentsTemplateType
        };
    }

    getPost = async () => {
        const { postId: id } = this.props;
        const query = BlogPostQuery.getBlogPost({ id });

        this.setState({ isLoading: true });
        try {
            const {
                blogPost: post = null
            } = await executeGet(prepareQuery(query), 'MagefanBlogBlogPost', ONE_MONTH_IN_SECONDS);

            this.setState(
                { post, isLoading: false, needToApplyOpenGraphMetas: true },
                () => {
                    this.requestProductList();
                }
            );
        } catch (_error) {
            this.setState({ isLoading: false, needToApplyOpenGraphMetas: false });
        }
    };

    requestProductList() {
        const { isRelatedProductsEnabled, numberOfRelatedProducts } = this.props;

        if (numberOfRelatedProducts < 1 || !convertNumToBool(isRelatedProductsEnabled)) {
            return;
        }

        const { requestProductList } = this.props;
        const { post: { related_products: relatedSKUs } = {} } = this.state;

        if (!relatedSKUs || relatedSKUs.length < 1) {
            this.setState({ isRelatedProductsLoading: false });
            return;
        }

        const options = {
            args: {
                filter: {
                    productsSkuArray: relatedSKUs
                },
                pageSize: numberOfRelatedProducts,
                currentPage: 1
            }
        };

        requestProductList(options).then(
            /** @namespace Scandiweb/MagefanBlog/Component/BlogPost/Container/requestProductList/then */
            () => {
                this.setState({ isRelatedProductsLoading: false });
            }
        ).catch(
            /** @namespace Scandiweb/MagefanBlog/Component/BlogPost/Container/requestProductList/then/catch */
            () => {
                this.setState({ isRelatedProductsLoading: false });
            }
        );
    }

    addOpenGraphMeta() {
        const openGraphMetasElements = [];

        this.openGraphMetaMap.forEach((meta, index) => {
            if (meta.getContent()) {
                openGraphMetasElements[index] = document.createElement('meta');
                openGraphMetasElements[index].setAttribute('property', meta.property);
                openGraphMetasElements[index].content = meta.getContent();
                document.head.appendChild(openGraphMetasElements[index]);
            }
        });

        document.head.setAttribute('prefix', OPEN_GRAPH_HEADER_PREFIX);
        this.setState({ openGraphMetasElements, needToApplyOpenGraphMetas: false });
    }

    removeOpenGraphMeta() {
        const { openGraphMetasElements } = this.state;

        if (openGraphMetasElements.length < 1) {
            return;
        }

        openGraphMetasElements.forEach((MetaElement, index) => {
            openGraphMetasElements[index].remove();
        });

        document.head.removeAttribute('prefix');
    }

    render() {
        return (
            <BlogPost
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostContainer);
