/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { UPDATE_ORDER_TYPE } from './OrderType.action';

/** @namespace Scandipwa/Store/OrderType/Reducer/getInitialState */
export const getInitialState = () => ({
    orderType: ''
});

/** @namespace Scandipwa/Store/OrderType/Reducer/OrderTypeReducer */
export const OrderTypeReducer = (state = getInitialState(), action) => {
    switch (action.type) {
    case UPDATE_ORDER_TYPE:
        const { orderType } = action;

        return {
            ...state,
            orderType
        };

    default:
        return state;
    }
};

export default OrderTypeReducer;
