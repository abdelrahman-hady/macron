/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { UPDATE_NOTES } from './CustomCartData.action';

/** @namespace Scandipwa/Store/CustomCartData/Reducer/getInitialState */
export const getInitialState = () => ({
    note: '',
    internalNote: ''
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

    default:
        return state;
    }
};

export default CustomCartDataReducer;