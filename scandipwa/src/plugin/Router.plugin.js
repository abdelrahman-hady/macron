/*
 * @category  Macron
 * @authors   Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 *            Opeyemi Ilesanmi <opeyemi.ilesanmi@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

/* eslint-disable react/jsx-no-bind */
/* eslint-disable @scandipwa/scandipwa-guidelines/no-jsx-variables */
/* eslint-disable max-len */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */

import { lazy } from 'react';
import { Route } from 'react-router-dom';

import { withStoreRegex } from 'Component/Router/Router.component';

export const MyClientsPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "MyClients" */ '../route/MyClientsPage'));
export const InvoicesPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "invoices" */ '../route/InvoicesPage'));
export const Shipments = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "shipments" */ '../route/Shipments'));

export const MY_CLIENTS = 'MY_CLIENTS';
export const INVOICES = 'INVOICES';
export const SHIPMENTS = 'SHIPMENTS';

const SWITCH_ITEMS_TYPE = (originalMember) => [
    ...originalMember,
    {

        component: <Route path={ withStoreRegex('/my-clients') } render={ (props) => <MyClientsPage { ...props } /> } />,
        position: 25,
        name: MY_CLIENTS
    },
    {
        component: <Route path={ withStoreRegex('/shipments') } render={ (props) => <Shipments { ...props } /> } />,
        position: 26,
        name: SHIPMENTS
    },
    {
        component: <Route path={ withStoreRegex('/invoices') } render={ (props) => <InvoicesPage { ...props } /> } />,
        position: 30,
        name: INVOICES
    }
];

export default {
    'Component/Router/Component': {
        'member-property': {
            SWITCH_ITEMS_TYPE
        }
    }
};
