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
import {
    ACCOUNT_FORGOT_PASSWORD,
    CHANGE_PASSWORD,
    CONFIRM_ACCOUNT,
    CREATE_ACCOUNT
} from 'Component/Router/Router.config';

export const MyClientsPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "MyClients" */ '../route/MyClientsPage'));
export const InvoicesPage = lazy(() => import(/* webpackMode: "lazy", webpackChunkName: "invoices" */ '../route/InvoicesPage'));

export const INVOICES = 'INVOICES';
export const MY_CLIENTS = 'MY_CLIENTS';

const URL_REMOVAL_LIST = [
    CREATE_ACCOUNT,
    CHANGE_PASSWORD,
    ACCOUNT_FORGOT_PASSWORD,
    CONFIRM_ACCOUNT
];
const AROUND_SWITCH_ITEMS_TYPE = (originalMembers) => {
    const newMembers = originalMembers.filter((CurrentUrls) => {
        if (URL_REMOVAL_LIST.includes(CurrentUrls.name)) {
            return false;
        }

        return true;
    });

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
            SWITCH_ITEMS_TYPE: AROUND_SWITCH_ITEMS_TYPE
        }
    }
};
