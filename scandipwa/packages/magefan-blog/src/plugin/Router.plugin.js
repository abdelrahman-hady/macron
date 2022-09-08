/**
 * Magefan Blog compatibility for ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

import { lazy } from 'react';
import { Route } from 'react-router-dom';

import { withStoreRegex } from 'Component/Router/Router.component';

export const BlogPage = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "magefan-blog" */
    '../route/BlogPage'
));
export const BLOG_ROUTE = 'BLOG';
export const POST_ROUTE = 'POST_ROUTE';

// eslint-disable-next-line @scandipwa/scandipwa-guidelines/no-jsx-variables
const SWITCH_ITEMS_TYPE = (originalMember) => [
    ...originalMember,
    {
        component: <Route
          path={ withStoreRegex('/blog') }
          // eslint-disable-next-line react/jsx-no-bind
          render={ (props) => (
              // eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction
                <BlogPage { ...props } />
          ) }
        />,
        position: 420,
        name: BLOG_ROUTE
    },
    {
        component: <Route
          path={ withStoreRegex('/blog/post/:query') }
          // eslint-disable-next-line react/jsx-no-bind
          render={ (props) => (
              // eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction
                <BlogPage { ...props } />
          ) }
        />,
        position: 421,
        name: POST_ROUTE
    }
];

// Needs to be changed with URL rewrites
export default {
    'Component/Router/Component': {
        'member-property': {
            SWITCH_ITEMS_TYPE
        }
    }
};
