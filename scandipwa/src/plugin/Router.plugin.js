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

import { LoginAccountPage, withStoreRegex } from 'Component/Router/Router.component';
import {
    HOME, LOGIN
} from 'Component/Router/Router.config';
import UrlRewrites from 'Route/UrlRewrites';
import { isSignedIn } from 'Util/Auth';

export const HomePage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "cms" */ 'Route/HomePage'));
export const MyClientsPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "MyClients" */ '../route/MyClientsPage'));
export const InvoicesPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "invoices" */ '../route/InvoicesPage'));

export const INVOICES = 'INVOICES';
export const MY_CLIENTS = 'MY_CLIENTS';

const SWITCH_ITEMS_TYPE = (originalMember) => [
    {
        component: <Route path={ withStoreRegex('/') } exact render={ (props) => (isSignedIn() ? <HomePage { ...props } /> : <LoginAccountPage { ...props } />) } />,
        position: 10,
        name: HOME
    },
    {
        component: <Route path={ withStoreRegex('/customer/account/login/') } render={ (props) => <UrlRewrites { ...props } /> } />,
        position: 62,
        name: LOGIN
    },
    {
        component: <Route path={ withStoreRegex('/invoices') } render={ (props) => <InvoicesPage { ...props } /> } />,
        position: 25,
        name: INVOICES
    },
    {
        component: <Route path={ withStoreRegex('/my-clients') } render={ (props) => <MyClientsPage { ...props } /> } />,
        position: 30,
        name: MY_CLIENTS
    },
    ...originalMember
];

export default {
    'Component/Router/Component': {
        'member-property': {
            SWITCH_ITEMS_TYPE
        }
    }
};
