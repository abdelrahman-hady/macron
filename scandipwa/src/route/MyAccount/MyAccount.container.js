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

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
    mapDispatchToProps,
    mapStateToProps as sourceMapStateToProps,
    MyAccountContainer as SourceMyAccountContainer
} from 'SourceRoute/MyAccount/MyAccount.container';
import OrderReducer from 'Store/Order/Order.reducer';
import {
    ACCOUNT_INFORMATION,
    ADDRESS_BOOK,
    FIRST_SECTION,
    MY_ACCOUNT, MY_DOWNLOADABLE, MY_ORDERS,
    MY_WISHLIST, NEWSLETTER_SUBSCRIPTION,
    SECOND_SECTION
} from 'Type/Account.type';
import { withReducers } from 'Util/DynamicReducer';

import MyAccount from './MyAccount.component';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);
export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

export { mapDispatchToProps };

/** @namespace Scandipwa/Route/MyAccount/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state),
    IsSapID: state.OrderReducer.orderList.items
});

/** @namespace Scandipwa/Route/MyAccount/Container */
export class MyAccountContainer extends SourceMyAccountContainer {
    static defaultProps = {
        selectedTab: null
    };

    static propTypes = {
        ...super.propTypes,
        IsSapID: PropTypes.arrayOf(PropTypes.string)
    };

    containerProps() {
        const {
            IsSapID
        } = this.props;

        return {
            IsSapID,
            ...super.containerProps()
        };
    }

    static tabMap = {
        [MY_ACCOUNT]: {
            url: '',
            tabName: __('My Account'),
            section: FIRST_SECTION
        },
        [MY_ORDERS]: {
            url: '/sales/order/history',
            tabName: __('My Orders'),
            section: FIRST_SECTION,
            isFullUrl: true
        },
        [ADDRESS_BOOK]: {
            url: '/customer/address',
            tabName: __('Address Book'),
            section: SECOND_SECTION,
            isFullUrl: true
        },
        [ACCOUNT_INFORMATION]: {
            url: '/edit',
            tabName: __('Account Information'),
            title: __('Edit Account Information'),
            section: SECOND_SECTION
        }
    };

    static isTabEnabled(props, tabName) {
        switch (tabName) {
        case MY_WISHLIST:
        case NEWSLETTER_SUBSCRIPTION:
        case MY_DOWNLOADABLE:
            return false;
        default:
            return true;
        }
    }

    isTabEnabled(tabName) {
        switch (tabName) {
        case MY_WISHLIST:
        case NEWSLETTER_SUBSCRIPTION:
        case MY_DOWNLOADABLE:
            return false;
        default:
            return true;
        }
    }

    tabsFilterEnabled(tabMap) {
        return Object.entries(tabMap).reduce((enabledTabs, [key, value]) => (
            MyAccountContainer.isTabEnabled(this.props, key)
                ? { ...enabledTabs, [key]: value } : enabledTabs
        ), {});
    }

    render() {
        return (
            <MyAccount
              { ...this.containerProps() }
              { ...this.containerFunctions }
              tabMap={ this.tabsFilterEnabled(MyAccountContainer.tabMap) }
            />
        );
    }
}

export default withRouter(withReducers({
    OrderReducer
})(connect(mapStateToProps, mapDispatchToProps)(MyAccountContainer)));
