/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { UPDATE_NOTES } from './OrderNotes.action';

/** @namespace Scandipwa/Store/OrderNotes/Reducer/getInitialState */
export const getInitialState = () => ({
    note: '',
    internalNote: ''
});

/** @namespace Scandipwa/Store/OrderNotes/Reducer/OrderNotesReducer */
export const OrderNotesReducer = (state = getInitialState(), action) => {
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

export default OrderNotesReducer;
