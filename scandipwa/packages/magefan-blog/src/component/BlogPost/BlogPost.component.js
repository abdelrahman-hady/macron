/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import Html from 'Component/Html';
import Loader from 'Component/Loader';
import ProductCard from 'Component/ProductCard';
import { ProductType } from 'Type/ProductList.type';

import { postType } from '../../type/MagefanBlog';
import { parsePostPath } from '../../util/BlogPage';
import Fancybox from '../../util/FancyBox';
import BlogPostComments from '../BlogPostComments';
import BlogPostInfo from '../BlogPostInfo';
import { COMMENTS_TEMPLATE_TYPE_DISABLED } from './BlogPost.config';

import './BlogPost.style';

/** @namespace Scandiweb/MagefanBlog/Component/BlogPost/Component/BlogPostComponent */
export class BlogPostComponent extends PureComponent {
    static propTypes = {
        post: postType.isRequired,
        isNextPrevEnabled: PropTypes.bool.isRequired,
        isRelatedPostsEnabled: PropTypes.bool.isRequired,
        isRelatedProductsEnabled: PropTypes.bool.isRequired,
        isRelatedProductsLoading: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired,
        relatedProducts: PropTypes.arrayOf(ProductType).isRequired,
        commentsTemplateType: PropTypes.string.isRequired
    };

    renderAddThisToolbox() {
        return <div className="addthis_toolbox addthis_default_style" />;
    }

    renderPostInfo() {
        const {
            post: {
                publish_time: publishTime,
                categories,
                comments_count: commentsCount,
                post_url: postUrl,
                tags,
                author,
                views_count: viewsCount
            },
            commentsTemplateType
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
            },
            viewsCount
        };

        return <BlogPostInfo postInfo={ postInfo } commentsTemplateType={ commentsTemplateType } />;
    }

    renderPostHeader() {
        return (
            <div className="post-header">
                { this.renderPostInfo() }
            </div>
        );
    }

    renderFeaturedImage(featuredImage, featuredImgAlt, postTitle) {
        // * vvv sometime it's false so we need to check it
        if (!featuredImage || featuredImage.toLowerCase() === 'false') {
            return null;
        }

        return (
            <div className="post-ftimg-hld">
                <img
                  src={ featuredImage }
                  alt={ !featuredImgAlt ? postTitle : featuredImgAlt }
                />
            </div>
        );
    }

    renderPostContent() {
        const {
            post: {
                featured_image: featuredImage,
                featured_img_alt: featuredImgAlt,
                filtered_content: filteredContent,
                content,
                title
            }
        } = this.props;

        return (
            <div className="post-content">
                <div className="post-description clearfix">
                    { this.renderFeaturedImage(featuredImage, featuredImgAlt, title) }
                    <div className="post-text-hld">
                        <Html content={ content || filteredContent } />
                        <div className="clear clearfix" />
                    </div>
                </div>
            </div>
        );
    }

    renderGalleryElements(gallery) {
        return gallery.map((imageUrl, index) => (
            <a
              className="gallery-image-hld"
              data-fancybox="gallery"
              href={ imageUrl }
              rel="nofollow"
            // eslint-disable-next-line react/no-array-index-key
              key={ `galleryImageKey${index}` }
            >
                <img className="gallery-image" src={ imageUrl } alt="" />
            </a>
        ));
    }

    renderGallery() {
        const { post: { media_gallery: gallery = [] } } = this.props;

        if (gallery.length < 1) {
            return null;
        }

        return (
            <div className="post-gallery clearfix">
                <Fancybox options={ { infinite: false, mainClass: 'fancybox-container-post-page' } }>
                    { this.renderGalleryElements(gallery) }
                </Fancybox>
            </div>
        );
    }

    renderNextPrevPost() {
        const { isNextPrevEnabled, post: { prevPost, nextPost } = {} } = this.props;

        if (!isNextPrevEnabled) {
            return null;
        }
        if (!prevPost && !nextPost) {
            return null;
        }

        return (
            <div className="post-nextprev-hld clearfix">
                    { prevPost && (
                        <Link
                          class="nextprev-link prev-link"
                          to={ parsePostPath(prevPost.url) }
                          title={ prevPost.title }
                        >
                            <Html content="&larr;" />
                            { __(' Previous') }
                        </Link>
                    ) }
                    { nextPost && (
                        <Link
                          class="nextprev-link next-link"
                          to={ parsePostPath(nextPost.url) }
                          title={ nextPost.title }
                        >
                            { __('Next ') }
                            <Html content="&rarr;" />
                        </Link>
                    ) }
            </div>
        );
    }

    renderRelatedPost({
        post_id: postId,
        title,
        post_url: postUrl
    }) {
        return (
            <li className="item" key={ `relatedPostKey${postId}` }>
                <Link
                  className="post-item-link"
                  title={ title }
                  to={ parsePostPath(postUrl) }
                >
                    { title }
                </Link>
            </li>
        );
    }

    renderRelatedPosts() {
        const {
            isRelatedPostsEnabled,
            post: { related_posts: relatedPosts = [] } = {}
        } = this.props;

        if (!isRelatedPostsEnabled || relatedPosts.length < 1) {
            return null;
        }

        return (
            <div className="mfblog-related-posts-block block related">
                <div className="block-title title">
                    <strong id="block-relatedposts-heading" role="heading" aria-level="2">
                        { __('Related Posts') }
                    </strong>
                </div>
                <ol className="block-content">
                    { relatedPosts.map((post) => (
                        this.renderRelatedPost(post)
                    )) }
                </ol>
            </div>
        );
    }

    renderRelatedProducts() {
        // * This can be a separate component
        const {
            isRelatedProductsEnabled,
            isRelatedProductsLoading,
            relatedProducts
        } = this.props;

        if (!isRelatedProductsEnabled || relatedProducts.length < 1) {
            return null;
        }

        if (isRelatedProductsLoading) {
            return (
            <div className="mfblog-related-products-block block related">
                <div className="block-title title">
                    <strong id="block-related-heading">{ __('Related Products') }</strong>
                </div>
                <div className="block-content content">
                    <Loader />
                </div>
            </div>
            );
        }

        return (
            <div className="mfblog-related-products-block block related">
                <div className="block-title title">
                    <strong id="block-related-heading">{ __('Related Products') }</strong>
                </div>
                <div className="block-content content">
                    <div className="products wrapper grid products-grid products-related">
                        <ol className="products list items product-items">
                            { relatedProducts.map((product) => (
                                <ProductCard
                                  product={ product }
                                  key={ `relatedProductKey${product.id}` }
                                />
                            )) }
                        </ol>
                    </div>
                </div>
            </div>
        );
    }

    renderComments() {
        const { commentsTemplateType } = this.props;

        if (commentsTemplateType === COMMENTS_TEMPLATE_TYPE_DISABLED) {
            return null;
        }

        const { post: { post_id: postId } } = this.props;

        return <BlogPostComments postId={ postId } />;
    }

    renderPostBottom() {
        return (
            <div className="post-bottom">
                { this.renderGallery() }
                { this.renderNextPrevPost() }
                { this.renderRelatedPosts() }
                { this.renderRelatedProducts() }
                { this.renderComments() }
            </div>
        );
    }

    renderPostHolder() {
        const { isLoading } = this.props;

        if (isLoading) {
            return <Loader />;
        }

        const { post: { post_id: postId } } = this.props;

        return (
            <div className={ `post-holder post-holder-${postId}` }>
                { this.renderPostHeader() }
                { this.renderPostContent() }
                { this.renderPostBottom() }
            </div>
        );
    }

    render() {
        return (
            <div block="PostPage" className="post-view">
                { this.renderPostHolder() }
            </div>
        );
    }
}

export default BlogPostComponent;
