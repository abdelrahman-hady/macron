/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

export const UPDATE_NOTES = 'UPDATE_NOTE';
export const UPDATE_ORDER_TYPE = 'UPDATE_ORDER_TYPE';

/** @namespace Scandipwa/Store/CustomCartData/Action/updateNotes */
export const updateNotes = (payload) => ({
    type: UPDATE_NOTES,
    payload
});

/** @namespace Scandipwa/Store/CustomCartData/Action/updateTypeAndCustomerSelect */
export const updateTypeAndCustomerSelect = (payload) => ({
    type: UPDATE_ORDER_TYPE,
    payload
});
