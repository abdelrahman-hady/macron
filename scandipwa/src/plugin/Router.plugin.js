/* eslint-disable max-lines */
/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

/* eslint-disable react/jsx-no-bind */
/* eslint-disable @scandipwa/scandipwa-guidelines/no-jsx-variables */
/* eslint-disable max-len */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */

import { lazy } from 'react';
import { Route } from 'react-router-dom';

import {
    PRINT_ALL_INVOICES,
    PRINT_ALL_REFUNDS,
    PRINT_ALL_SHIPMENT,
    PRINT_INVOICE,
    PRINT_ORDER as PRINT_ORDER_REQUEST,
    PRINT_REFUND,
    PRINT_SHIPMENT
} from 'Component/MyAccountOrderPrint/MyAccountOrderPrint.config';
import {
    CartPage,
    Checkout,
    CmsPage,
    ConfirmAccountPage,
    ContactPage,
    CreateAccountPage,
    ForgotPasswordPage,
    HomePage,
    LoginAccountPage,
    MenuPage,
    MyAccount,
    OrderPrintPage,
    PasswordChangePage,
    ProductComparePage,
    SearchPage,
    SendConfirmationPage,
    StyleGuidePage,
    WishlistShared,
    withStoreRegex
} from 'Component/Router/Router.component';
import {
    ACCOUNT_FORGOT_PASSWORD,
    CART,
    CHANGE_PASSWORD,
    CHECKOUT,
    CMS_PAGE,
    COMPARE,
    CONFIRM_ACCOUNT,
    CONTACT_PAGE,
    CREATE_ACCOUNT,
    HOME,
    LOGIN,
    MENU,
    MY_ACCOUNT,
    MY_ACCOUNT_ADDRESS,
    MY_ACCOUNT_DOWNLOADABLE,
    MY_ACCOUNT_NEWSLETTER,
    MY_ACCOUNT_ORDER,
    MY_ACCOUNT_ORDERS,
    MY_ACCOUNT_WISHLIST,
    PRINT_ORDER,
    SEARCH,
    SHARED_WISHLIST,
    STYLE_GUIDE,
    URL_REWRITES
} from 'Component/Router/Router.config';
import UrlRewrites from 'Route/UrlRewrites';
import { appendWithStoreCode } from 'SourceUtil/Url';
import {
    ADDRESS_BOOK, MY_DOWNLOADABLE, MY_ORDERS, MY_WISHLIST, NEWSLETTER_SUBSCRIPTION
} from 'Type/Account.type';
// import UrlRewrites from 'Route/UrlRewrites';
import { isSignedIn } from 'Util/Auth';
import history from 'Util/History';

export const MyClientsPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "MyClients" */ '../route/MyClientsPage'));
export const InvoicesPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "invoices" */ '../route/InvoicesPage'));

export const INVOICES = 'INVOICES';
export const MY_CLIENTS = 'MY_CLIENTS';

const SWITCH_ITEMS_TYPE = () => [
    {
        component: <Route path={ withStoreRegex('/') } exact render={ (props) => (isSignedIn() ? <HomePage { ...props } /> : <LoginAccountPage { ...props } />) } />,
        position: 10,
        name: HOME
    },
    {
        component: <Route path={ withStoreRegex('/customer/account/login/') } render={ () => history.replace(appendWithStoreCode('/')) } />,
        position: 62,
        name: LOGIN
    },
    {
        component: <Route path={ withStoreRegex('/invoices') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <InvoicesPage { ...props } />) } />,
        position: 25,
        name: INVOICES
    },
    {
        component: <Route path={ withStoreRegex('/my-clients') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <MyClientsPage { ...props } />) } />,
        position: 30,
        name: MY_CLIENTS
    },
    {
        component: <Route path={ withStoreRegex('/search/:query/') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <SearchPage { ...props } />) } />,
        position: 25,
        name: SEARCH
    },
    {
        component: <Route path={ withStoreRegex('/page') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <CmsPage { ...props } />) } />,
        position: 40,
        name: CMS_PAGE
    },
    {
        component: <Route path={ withStoreRegex('/cart') } exact render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <CartPage { ...props } />) } />,
        position: 50,
        name: CART
    },
    {
        component: <Route path={ withStoreRegex('/checkout/:step?') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <Checkout { ...props } />) } />,
        position: 55,
        name: CHECKOUT
    },
    {
        component: <Route path={ withStoreRegex('/customer/account/createPassword/') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <PasswordChangePage { ...props } />) } />,
        position: 60,
        name: CHANGE_PASSWORD
    },
    {
        component: <Route path={ withStoreRegex('/customer/account/create/') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <CreateAccountPage { ...props } />) } />,
        position: 61,
        name: CREATE_ACCOUNT
    },
    {
        component: <Route path={ withStoreRegex('/customer/account/login/') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <LoginAccountPage { ...props } />) } />,
        position: 62,
        name: LOGIN
    },
    {
        component: <Route path={ withStoreRegex('/customer/account/forgotpassword/') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <ForgotPasswordPage { ...props } />) } />,
        position: 63,
        name: ACCOUNT_FORGOT_PASSWORD
    },
    {
        component: <Route path={ withStoreRegex('/customer/account/confirmation') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <SendConfirmationPage { ...props } />) } />,
        position: 64,
        name: CONFIRM_ACCOUNT
    },
    {
        component: <Route path={ withStoreRegex('/customer/account/confirm') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <ConfirmAccountPage { ...props } />) } />,
        position: 65,
        name: CONFIRM_ACCOUNT
    },
    {
        component: <Route path={ withStoreRegex('/sales/order/view/order_id/:orderId?') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <MyAccount { ...props } selectedTab={ MY_ORDERS } />) } />,
        position: 70,
        name: MY_ACCOUNT_ORDER
    },
    {
        component: <Route path={ withStoreRegex('/sales/order/history') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <MyAccount { ...props } selectedTab={ MY_ORDERS } />) } />,
        position: 71,
        name: MY_ACCOUNT_ORDERS
    },
    {
        component: <Route path={ withStoreRegex('/downloadable/customer/products') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <MyAccount { ...props } selectedTab={ MY_DOWNLOADABLE } />) } />,
        position: 72,
        name: MY_ACCOUNT_DOWNLOADABLE
    },
    {
        component: <Route path={ withStoreRegex('/wishlist') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <MyAccount { ...props } selectedTab={ MY_WISHLIST } />) } />,
        position: 73,
        name: MY_ACCOUNT_WISHLIST
    },
    {
        component: <Route path={ withStoreRegex('/customer/address') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <MyAccount { ...props } selectedTab={ ADDRESS_BOOK } />) } />,
        position: 74,
        name: MY_ACCOUNT_ADDRESS
    },
    {
        component: <Route path={ withStoreRegex('/newsletter/manage') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <MyAccount { ...props } selectedTab={ NEWSLETTER_SUBSCRIPTION } />) } />,
        position: 75,
        name: MY_ACCOUNT_NEWSLETTER
    },
    {
        component: <Route path={ withStoreRegex('/customer/account/:tab?') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <MyAccount { ...props } />) } />,
        position: 76,
        name: MY_ACCOUNT
    },
    {
        component: <Route path={ withStoreRegex('/menu') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <MenuPage { ...props } />) } />,
        position: 80,
        name: MENU
    },
    {
        component: <Route path={ withStoreRegex('/wishlist/shared/:code') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <WishlistShared { ...props } />) } />,
        position: 81,
        name: SHARED_WISHLIST
    },
    {
        component: <Route path={ withStoreRegex('/contact') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <ContactPage { ...props } />) } />,
        position: 82,
        name: CONTACT_PAGE
    },
    {
        component: <Route path={ withStoreRegex('/compare') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <ProductComparePage { ...props } />) } />,
        position: 83,
        name: COMPARE
    },
    {
        component: <Route path={ withStoreRegex('/styleguide') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <StyleGuidePage { ...props } />) } />,
        position: 84,
        name: STYLE_GUIDE
    },
    {
        component: <Route path={ withStoreRegex('/sales/order/print/order_id/:orderId?') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <OrderPrintPage { ...props } orderPrintRequest={ PRINT_ORDER_REQUEST } />) } />,
        position: 90,
        name: PRINT_ORDER
    },
    {
        component: <Route path={ withStoreRegex('/sales/order/printInvoice/order_id/:orderId?') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <OrderPrintPage { ...props } orderPrintRequest={ PRINT_ALL_INVOICES } />) } />,
        position: 91,
        name: PRINT_ORDER
    },
    {
        component: <Route path={ withStoreRegex('/sales/order/printShipment/order_id/:orderId?') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <OrderPrintPage { ...props } orderPrintRequest={ PRINT_ALL_SHIPMENT } />) } />,
        position: 92,
        name: PRINT_ORDER
    },
    {
        component: <Route path={ withStoreRegex('/sales/order/printCreditmemo/order_id/:orderId?') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <OrderPrintPage { ...props } orderPrintRequest={ PRINT_ALL_REFUNDS } />) } />,
        position: 93,
        name: PRINT_ORDER
    },
    {
        component: <Route path={ withStoreRegex('/sales/order/printInvoice/invoice_id/:invoiceId?') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <OrderPrintPage { ...props } orderPrintRequest={ PRINT_INVOICE } />) } />,
        position: 94,
        name: PRINT_ORDER
    },
    {
        component: <Route path={ withStoreRegex('/sales/order/printShipment/shipment_id/:shipmentId?') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <OrderPrintPage { ...props } orderPrintRequest={ PRINT_SHIPMENT } />) } />,
        position: 95,
        name: PRINT_ORDER
    },
    {
        component: <Route path={ withStoreRegex('/sales/order/printCreditmemo/creditmemo_id/:refundId?') } render={ (props) => (!isSignedIn() ? history.replace(appendWithStoreCode('/')) : <OrderPrintPage { ...props } orderPrintRequest={ PRINT_REFUND } />) } />,
        position: 95,
        name: PRINT_ORDER
    },
    {
        component: <Route render={ (props) => <UrlRewrites { ...props } /> } />,
        position: 1000,
        name: URL_REWRITES
    }
];

export default {
    'Component/Router/Component': {
        'member-property': {
            SWITCH_ITEMS_TYPE
        }
    }
};
