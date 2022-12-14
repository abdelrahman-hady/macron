/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { UPDATE_BUSINESS_LINE, UPDATE_NOTES, UPDATE_ORDER_TYPE } from './CustomCartData.action';

/** @namespace Scandipwa/Store/CustomCartData/Reducer/getInitialState */
export const getInitialState = () => ({
    note: '',
    internalNote: '',
    orderType: '',
    selectedCustomer: '',
    businessLine: '',
    b2bProfileId: ''
});

/** @namespace Scandipwa/Store/CustomCartData/Reducer/CustomCartDataReducer */
export const CustomCartDataReducer = (state = getInitialState(), action) => {
    switch (action.type) {
    case UPDATE_NOTES:
        const { payload: { note, internalNote } } = action;

        return {
            ...state,
            note,
            internalNote
        };
    case UPDATE_ORDER_TYPE:
        const { payload: { orderType, selectedCustomer } } = action;

        return {
            ...state,
            orderType,
            selectedCustomer
        };
    case UPDATE_BUSINESS_LINE:
        const { payload: { businessLine, b2bProfileId } } = action;

        return {
            ...state,
            businessLine,
            b2bProfileId
        };
    default:
        return state;
    }
};

export default CustomCartDataReducer;
