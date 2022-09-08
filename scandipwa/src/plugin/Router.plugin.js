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

export const MyClientsPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "my-clients" */ '../route/MyClientsPage'));
export const InvoicesPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "invoices" */ '../route/InvoicesPage'));
export const Shipments = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "shipments" */ '../route/Shipments'));
export const CreateClientPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "create-client" */ '../route/CreateClientPage'));
export const ClientPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "client" */ '../route/ClientPage'));

export const INVOICES = 'INVOICES';
export const MY_CLIENTS = 'MY_CLIENTS';
export const SHIPMENTS = 'SHIPMENTS';
export const CREATE_CLIENT = 'CREATE_CLIENT';
export const CLIENT = 'CLIENT';
export const EDIT_CLIENT = 'EDIT_CLIENT';

const SWITCH_ITEMS_TYPE = (originalMember) => [
    ...originalMember,
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
        component: <Route path={ withStoreRegex('/my-clients/edit/:clientId') } render={ (props) => <CreateClientPage { ...props } isEdit /> } />,
        position: 28,
        name: EDIT_CLIENT
    }
];

export default {
    'Component/Router/Component': {
        'member-property': {
            SWITCH_ITEMS_TYPE
        }
    }
};
