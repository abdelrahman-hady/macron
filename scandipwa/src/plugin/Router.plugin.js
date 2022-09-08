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
import { Redirect, Route } from 'react-router-dom';

import {
    HomePage,
    LoginAccountPage,
    withStoreRegex
} from 'Component/Router/Router.component';
import {
    ACCOUNT_FORGOT_PASSWORD,
    CHANGE_PASSWORD,
    CONFIRM_ACCOUNT,
    CREATE_ACCOUNT,
    HOME,
    LOGIN
} from 'Component/Router/Router.config';
import { appendWithStoreCode } from 'SourceUtil/Url';
import { isSignedIn } from 'Util/Auth';
import history from 'Util/History';

export const MyClientsPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "my-clients" */ '../route/MyClientsPage'));
export const InvoicesPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "invoices" */ '../route/InvoicesPage'));
export const Shipments = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "shipments" */ '../route/Shipments'));
export const ClientPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "client" */ '../route/ClientPage'));
export const CreateClientPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "create-client" */ '../route/CreateClientPage'));
export const StatsPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "Stats" */ '../route/StatsPage'));
export const MyProfilePage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "MyProfilePage" */ '../route/MyProfilePage'));

export const MY_CLIENTS = 'MY_CLIENTS';
export const INVOICES = 'INVOICES';
export const SHIPMENTS = 'SHIPMENTS';
export const CREATE_CLIENT = 'CREATE_CLIENT';
export const CLIENT = 'CLIENT';
export const STATS_PAGE = 'STATS_PAGE';
export const MY_PROFILE = 'MY_PROFILE';
export const EDIT_CLIENT = 'EDIT_CLIENT';

const URL_REMOVAL_LIST = [
    CREATE_ACCOUNT,
    CHANGE_PASSWORD,
    ACCOUNT_FORGOT_PASSWORD,
    CONFIRM_ACCOUNT
];

const BEFORE_ITEMS_TYPE = (originalMember) => [
    ...originalMember,
    !isSignedIn() && {
        component: <Redirect to={ appendWithStoreCode('/') } />,
        position: 40,
        name: 'redirect'
    }
];

const AROUND_SWITCH_ITEMS_TYPE = (originalMembers) => {
    const newMembers = originalMembers.filter((CurrentUrls) => {
        if (URL_REMOVAL_LIST.includes(CurrentUrls.name)) {
            return false;
        }

        return true;
    });

    return [
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
            component: <Route path={ withStoreRegex('/invoices') } render={ (props) => <InvoicesPage { ...props } /> } />,
            position: 30,
            name: INVOICES
        },
        {
            component: <Route path={ withStoreRegex('/my-clients') } exact render={ (props) => <MyClientsPage { ...props } /> } />,
            position: 30,
            name: MY_CLIENTS
        },
        {
            component: <Route path={ withStoreRegex('/shipments') } render={ (props) => <Shipments { ...props } /> } />,
            position: 26,
            name: SHIPMENTS
        },
        {
            component: <Route path={ withStoreRegex('/my-clients/create-client') } render={ (props) => <CreateClientPage { ...props } /> } />,
            position: 29,
            name: CREATE_CLIENT
        },
        {
            component: <Route path={ withStoreRegex('/my-clients/:clientId?') } render={ (props) => <ClientPage { ...props } /> } />,
            position: 31,
            name: CLIENT
        },
        {
            component: <Route path={ withStoreRegex('/stats') } render={ (props) => <StatsPage { ...props } /> } />,
            position: 45,
            name: STATS_PAGE
        },
        {
            component: <Route path={ withStoreRegex('/my-profile') } render={ (props) => <MyProfilePage { ...props } /> } />,
            position: 27,
            name: MY_PROFILE
        },
        {
            component: <Route path={ withStoreRegex('/my-clients/edit/:clientId') } render={ (props) => <CreateClientPage { ...props } isEdit /> } />,
            position: 28,
            name: EDIT_CLIENT
        },
        ...newMembers
    ];
};

export default {
    'Component/Router/Component': {
        'member-property': {
            SWITCH_ITEMS_TYPE: AROUND_SWITCH_ITEMS_TYPE,
            BEFORE_ITEMS_TYPE
        }
    }
};
