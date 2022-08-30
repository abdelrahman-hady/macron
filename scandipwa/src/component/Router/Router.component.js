/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
/* eslint-disable
@scandipwa/scandipwa-guidelines/no-jsx-variables */

import {
    lazy
} from 'react';
import { Route } from 'react-router-dom';

import { Router as SourceRouter } from
'SourceComponent/Router/Router.component';

import {
    LOGIN
} from './Router.config';

export const LoginAccountPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName:
"compare" */'Route/LoginAccount'
));

/** @namespace Scandipwa/Component/Router/Component/withStoreRegex */
export const withStoreRegex = (path) => window.storeRegexText.concat(path);

/** @namespace Scandipwa/Component/Router/Component */
export class RouterComponent extends SourceRouter {
    // overrided to change initial page to login
    renderDefaultRouterContent() {
        this.SWITCH_ITEMS_TYPE[0] = {
            component: <Route path={ withStoreRegex('/') } exact render={ (props) => <LoginAccountPage { ...props } /> } />,
            position: 10,
            name: LOGIN
        };

        return super.renderDefaultRouterContent();
    }
}

export default RouterComponent;
