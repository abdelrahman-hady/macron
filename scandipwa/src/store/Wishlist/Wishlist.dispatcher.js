/*
 * @category  Macron
 * @author    Opeyemi Ilesanmi <opeyemi.ilesanmi@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import {
    WishlistDispatcher as SourceWishlistDispatcher
} from 'SourceStore/Wishlist/Wishlist.dispatcher';
import { isSignedIn } from 'Util/Auth';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/**
  * Get wishlist setting.
  * @namespace Scandipwa/Store/Wishlist/Dispatcher/isWishlistEnabled */
export const isWishlistEnabled = () => false;

/**
  * Product Wishlist Dispatcher
  * @class WishlistDispatcher
  * @namespace Scandipwa/Store/Wishlist/Dispatcher  */
export class WishlistDispatcher extends SourceWishlistDispatcher {
    updateInitialWishlistData(dispatch) {
        if (isSignedIn() && isWishlistEnabled()) {
            this._syncWishlistWithBE(dispatch);
        }
    }
}

export default new WishlistDispatcher();
