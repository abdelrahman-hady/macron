/*
 * @category  Macron
 * @author    Opeyemi Ilesanmi <opeyemi.ilesanmi@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright  Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com) (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

/* eslint-disable react/jsx-no-bind */
/* eslint-disable @scandipwa/scandipwa-guidelines/no-jsx-variables */
/* eslint-disable max-len */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */

import { lazy } from 'react';
import { Route } from 'react-router-dom';

import { withStoreRegex } from 'Component/Router/Router.component';

export const Shipments = lazy(() => import(
    '../route/Shipments'
));
export const ROUTE_NAME = 'SHIPMENTS';

const SWITCH_ITEMS_TYPE = (originalMember) => [
    ...originalMember,
    {
        component: <Route path={ withStoreRegex('/shipments') } render={ (props) => <Shipments { ...props } /> } />,
        position: 26,
        name: ROUTE_NAME
    }
];

export default {
    'Component/Router/Component': {
        'member-property': {
            SWITCH_ITEMS_TYPE
        }
    }
};
