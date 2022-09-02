/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import {
    getInitialState as sourceGetInitialState,
    OrderReducer as sourceOrderReducer
} from 'SourceStore/Order/Order.reducer';

import { GET_ORDERS_CONFIG } from './Order.action';

/** @namespace Scandipwa/Store/Order/Reducer/getInitialState */
export const getInitialState = () => ({
    ...sourceGetInitialState(),
    ordersConfig: {}
});

/** @namespace Scandipwa/Store/Order/Reducer/OrderReducer */
export const OrderReducer = (
    state = getInitialState(),
    action
) => {
    const {
        type,
        ordersConfig,
        status
    } = action;

    switch (type) {
    case GET_ORDERS_CONFIG:
        return {
            ...state,
            isLoading: status,
            ordersConfig
        };
    default:
        return sourceOrderReducer(state, action);
    }
};

export default OrderReducer;
