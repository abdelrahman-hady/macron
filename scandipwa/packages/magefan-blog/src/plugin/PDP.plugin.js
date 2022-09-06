/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { Suspense } from 'react';

import Loader from 'Component/Loader';
import { prepareQuery } from 'Util/Query';
import { executeGet } from 'Util/Request';

import { ONE_MONTH_IN_SECONDS } from '../component/BlogPost/BlogPost.config';
import PDPRelatedPosts from '../component/PDPRelatedPosts';
import { RELATED_POSTS } from '../component/PDPRelatedPosts/PDPRelatedPosts.config';
import BlogPostsQuery from '../query/BlogPosts.query';

const mapStateToProps = (args, callback) => {
    const {
        ConfigReducer
    } = args[0];

    const {
        mfblog_product_page_number_of_related_posts,
        mfblog_product_page_related_posts_enabled
    } = ConfigReducer;

    return {
        ...callback(...args),
        relatedPostsNumber: mfblog_product_page_number_of_related_posts,
        relatedPostsEnabled: mfblog_product_page_related_posts_enabled
    };
};

const addContainerProps = (args, callback, instance) => {
    const { relatedPosts } = instance.state;
    return { ...callback(...args), relatedPosts };
};

const renderRelatedPosts = (_args, _callback, instance) => {
    const { relatedPosts: { items } } = instance.props;

    return (
        <Suspense fallback={ <Loader /> }>
            <PDPRelatedPosts relatedPosts={ items } />
        </Suspense>
    );
};

async function getRelatedPosts(_arg, _callback, instance) {
    const {
        productID,
        relatedPostsEnabled
    } = instance.props;

    if (!relatedPostsEnabled) {
        return;
    }

    const filter = {
        relatedproduct_id: { eq: productID }
    };

    // vvv Needs to be moved to context
    const query = BlogPostsQuery.getBlogPosts({ filter });
    const { blogPosts: relatedPosts } = await executeGet(
        prepareQuery(query), 'MagefanBlogPDPRelatedPosts', ONE_MONTH_IN_SECONDS
    );

    instance.setState({ relatedPosts });
}

const addRelatedPostsTab = (member, instance) => ({
    ...member,
    [RELATED_POSTS]: {
        name: __('Related posts'),
        shouldTabRender: () => {
            const {
                relatedPosts,
                areDetailsLoaded
            } = instance.props;

            const { total_count } = relatedPosts;
            return total_count > 0 && areDetailsLoaded;
        },
        render: instance.renderRelatedPosts
    }
});

export default {
    'Route/ProductPage/Container/mapStateToProps': {
        function: mapStateToProps
    },
    'Route/ProductPage/Container': {
        'member-function': {
            containerProps: addContainerProps,
            getRelatedPosts,
            updateBreadcrumbs: (args, callback, instance) => {
                callback(...args);
                instance.getRelatedPosts();
            },
            __construct: (args, callback, instance) => {
                callback(...args);
                // eslint-disable-next-line no-param-reassign
                instance.state.relatedPosts = {};
            }
        }
    },
    'Route/ProductPage/Component': {
        'member-property': {
            tabMap: addRelatedPostsTab
        },
        'member-function': {
            renderRelatedPosts
        }
    }

};
