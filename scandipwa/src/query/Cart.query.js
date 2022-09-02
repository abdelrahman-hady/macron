/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import {
    CartQuery as SourceCartQuery
} from 'SourceQuery/Cart.query';
import { isSignedIn } from 'Util/Auth';
import { Field } from 'Util/Query';

/** @namespace Scandipwa/Query/Cart/Query */
export class CartQuery extends SourceCartQuery {
    getClearCartMutation(quoteId) {
        const mutation = new Field('clearCart')
            .addFieldList(this._getRemoveCartItemFields(quoteId));

        if (!isSignedIn()) {
            mutation.addArgument('guestCartId', 'String', quoteId);
        }

        return mutation;
    }
}

export default new CartQuery();
