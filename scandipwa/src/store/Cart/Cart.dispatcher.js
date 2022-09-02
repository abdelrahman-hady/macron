/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import CartQuery from 'Query/Cart.query';
import {
    CartDispatcher as SourceCartDispatcher
} from 'SourceStore/Cart/Cart.dispatcher';
import { showNotification } from 'Store/Notification/Notification.action';
import { isSignedIn } from 'Util/Auth';
import { getGuestQuoteId } from 'Util/Cart';
import { fetchMutation, getErrorMessage } from 'Util/Request';

/** @namespace Scandipwa/Store/Cart/Dispatcher */
export class CartDispatcher extends SourceCartDispatcher {
    async clearCart(dispatch) {
        try {
            const isCustomerSignedIn = isSignedIn();
            const guestQuoteId = !isCustomerSignedIn && getGuestQuoteId();

            if (!isCustomerSignedIn && !guestQuoteId) {
                return null;
            }

            const { cartData = {} } = await fetchMutation(
                CartQuery.getClearCartMutation(guestQuoteId)
            );

            this._updateCartData(cartData, dispatch);

            return cartData;
        } catch (error) {
            dispatch(showNotification('error', getErrorMessage(error)));

            return null;
        }
    }
}

export default new CartDispatcher();
