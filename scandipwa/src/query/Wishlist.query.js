/*
 * @category  Macron
 * @author    Opeyemi Ilesanmi <opeyemi.ilesanmi@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import {
    WishlistQuery as SourceWishlistQuery
} from 'SourceQuery/Wishlist.query';

/** @namespace Scandipwa/Query/Wishlist/Query */
export class WishlistQuery extends SourceWishlistQuery {
    getWishlistQuery() {
        return false;
    }
}

export default new WishlistQuery();
