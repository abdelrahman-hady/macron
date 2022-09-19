/*
 * @category  Macron
 * @author    Opeyemi Ilesanmi <opeyemi.ilesanmi@scandiweb.com | info@scandiweb.com>
 * @author    Saad Amir <saad.amir@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

/* eslint-disable react/jsx-no-bind */
/* eslint-disable @scandipwa/scandipwa-guidelines/no-jsx-variables */
/* eslint-disable max-len */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
/* eslint-disable @scandipwa/scandipwa-guidelines/only-render-in-component */

import PropTypes from 'prop-types';
import { lazy, Suspense } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import DashboardInvoicesTable from 'Component/DashboardInvoicesTable';
import DashboardOrdersTable from 'Component/DashboardOrdersTable';
import DashboardShipmentsTable from 'Component/DashboardShipmentsTable';
import Loader from 'Component/Loader/Loader.component';
import MyAccountInformation from 'Component/MyAccountInformation';
import MyAccountOrder from 'Component/MyAccountOrder';
import NoMatch from 'Route/NoMatch';
import { MyAccount as SourceMyAccount } from 'SourceRoute/MyAccount/MyAccount.component';
import {
    ACCOUNT_INFORMATION,
    ActiveTabType,
    ADDRESS_BOOK,
    MY_ACCOUNT,
    MY_ORDER,
    MY_ORDERS,
    TabMapType
} from 'Type/Account.type';
import { LocationType, MatchType } from 'Type/Router.type';
import { isSignedIn } from 'Util/Auth';

export const MyAccountAddressBook = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "account-address" */
    'Component/MyAccountAddressBook'
));
export const MyAccountDashboard = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "account-dashboard" */
    'Component/MyAccountDashboard'
));

export const MyAccountMyOrders = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "account-orders" */
    'Component/MyAccountMyOrders'
));

/** @namespace Scandipwa/Route/MyAccount/Component */
export class MyAccountComponent extends SourceMyAccount {
    DASHBOARD = 'dashboard';

    static propTypes = {
        isEditingActive: PropTypes.bool.isRequired,
        subHeading: PropTypes.string,
        activeTab: ActiveTabType.isRequired,
        tabMap: TabMapType.isRequired,
        onSignIn: PropTypes.func.isRequired,
        location: LocationType.isRequired,
        match: MatchType.isRequired,
        changeTabName: PropTypes.func.isRequired,
        tabName: PropTypes.string,
        setTabSubheading: PropTypes.func.isRequired,
        isTabEnabled: PropTypes.func.isRequired
    };

    renderMap = {
        [MY_ACCOUNT]: MyAccountDashboard,
        [MY_ORDER]: MyAccountOrder,
        [MY_ORDERS]: MyAccountMyOrders,
        [ADDRESS_BOOK]: MyAccountAddressBook,
        [ACCOUNT_INFORMATION]: MyAccountInformation
    };

    renderUpcomingShipmentsTable() {
        const {
            activeTab
        } = this.props;

        if (activeTab === this.DASHBOARD) {
            return <DashboardShipmentsTable />;
        }

        return '';
    }

    renderOrdersTable() {
        const {
            activeTab
        } = this.props;

        if (activeTab === this.DASHBOARD) {
            return <DashboardOrdersTable />;
        }

        return '';
    }

    renderInvoicesTable() {
        const {
            activeTab
        } = this.props;

        if (activeTab === this.DASHBOARD) {
            return <DashboardInvoicesTable />;
        }

        return '';
    }

    renderContent() {
        const {
            activeTab,
            tabMap,
            isEditingActive,
            match,
            changeTabName,
            tabName,
            setTabSubheading,
            isTabEnabled
        } = this.props;

        if (!isSignedIn()) {
            return this.renderLoginOverlay();
        }

        if (!isTabEnabled(activeTab)) {
            return <NoMatch />;
        }

        const TabContent = this.getTabContent();
        const { title } = tabMap[activeTab];

        return (
            <ContentWrapper
              label={ __('My Account page') }
              wrapperMix={ { block: 'MyAccount', elem: 'Wrapper' } }
            >
                <div
                  block="MyAccount"
                  elem="TabContent"
                  mods={ { activeTab } }
                >
                    { this.renderUpcomingShipmentsTable() }
                    { this.renderInvoicesTable() }
                    { this.renderOrdersTable() }
                    <h2 block="MyAccount" elem="Heading">
                        { title || tabName }
                        { this.renderSubHeading() }
                    </h2>
                    <Suspense fallback={ <Loader /> }>
                        <TabContent
                          isEditingActive={ isEditingActive }
                          match={ match }
                          changeTabName={ changeTabName }
                          tabMap={ tabMap }
                          setTabSubheading={ setTabSubheading }
                        />
                    </Suspense>
                </div>
            </ContentWrapper>
        );
    }
}

export default MyAccountComponent;
