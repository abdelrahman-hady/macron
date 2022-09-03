/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
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

export const INVOICES = 'INVOICES';
export const MY_CLIENTS = 'MY_CLIENTS';

const modifyUrls = (originalMembers) => {
    function checkUrl(memberElement) {
        if (memberElement.name === 'CREATE_ACCOUNT' || memberElement.name === 'CHANGE_PASSWORD' || memberElement.name === 'ACCOUNT_FORGOT_PASSWORD' || memberElement.name === 'CONFIRM_ACCOUNT') {
            return false;
        }

        return true;
    }
    const newMembers = originalMembers.filter((route) => checkUrl(route));

    return [
        ...newMembers,
        {
            component: <Route path={ withStoreRegex('/invoices') } render={ (props) => <InvoicesPage { ...props } /> } />,
            position: 25,
            name: INVOICES
        },
        {
            component: <Route path={ withStoreRegex('/my-clients') } render={ (props) => <MyClientsPage { ...props } /> } />,
            position: 30,
            name: MY_CLIENTS
        }
    ];
};

export default {
    'Component/Router/Component': {
        'member-property': {
            SWITCH_ITEMS_TYPE: modifyUrls
        }
    }
};
