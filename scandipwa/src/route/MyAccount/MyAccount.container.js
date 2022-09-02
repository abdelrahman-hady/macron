/*
 * @category  Macron
 * @author    Opeyemi Ilesanmi <opeyemi.ilesanmi@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

/* eslint-disable react/jsx-no-bind */
/* eslint-disable @scandipwa/scandipwa-guidelines/no-jsx-variables */
/* eslint-disable max-len */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import NoMatch from 'Route/NoMatch';
import { mapDispatchToProps, mapStateToProps, MyAccountContainer as SourceMyAccountContainer } from 'SourceRoute/MyAccount/MyAccount.container';
import { updateNoMatch } from 'Store/NoMatch/NoMatch.action';
import OrderReducer from 'Store/Order/Order.reducer';
import {
    MY_ACCOUNT,
    MY_DOWNLOADABLE,
    MY_WISHLIST,
    NEWSLETTER_SUBSCRIPTION
} from 'Type/Account.type';
import { withReducers } from 'Util/DynamicReducer';

import { ACCOUNT_URL } from './MyAccount.config';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);
export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

export { mapStateToProps, mapDispatchToProps };

/** @namespace Scandipwa/Route/MyAccount/Container */
export class MyAccountContainer extends SourceMyAccountContainer {
    static isTabEnabled() {
        return false;
    }

    isTabEnabled() {
        return false;
    }

    updateBreadcrumbs() {
        const { updateBreadcrumbs } = this.props;
        const breadcrumbs = [];

        breadcrumbs.push({ name: __('My Account'), url: ACCOUNT_URL });

        updateBreadcrumbs(breadcrumbs);
    }

    render() {
        const { selectedTab, props } = this.props;

        switch (selectedTab) {
        case MY_ACCOUNT:
            updateNoMatch(false);
            return null;
        case MY_DOWNLOADABLE:
        case MY_WISHLIST:
        case NEWSLETTER_SUBSCRIPTION:
            updateNoMatch({ noMatch: true });
            return <NoMatch { ...props } />;
        default:
            return null;
        }
    }
}

export default withRouter(withReducers({
    OrderReducer
})(connect(mapStateToProps, mapDispatchToProps)(MyAccountContainer)));
