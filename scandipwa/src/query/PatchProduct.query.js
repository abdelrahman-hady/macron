/*
 * @category  Macron
 * @author    Juris Kucinskis <juris.kucinskis@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */
import { ORDERS_PER_PAGE } from 'Component/MyAccountMyOrders/MyAccountMyOrders.config';
import { Field } from 'Util/Query';

/** @namespace Scandipwa/Query/PatchProduct/Query */
export class PatchProductQuery {
    getPatchProductQuery(keyword) {
        return new Field('patchProductCollection')
            .addArgument('keyword', 'String!', keyword)
            .addArgument('pageSize', 'String', ORDERS_PER_PAGE)
            .addField(this._getPatchProductField());
    }

    _getPatchProductField() {
        return new Field('allPatchProducts')
            .addFieldList(this._getPatchProductFields());
    }

    _getPatchProductFields() {
        return [
            'sku',
            'name',
            'price'
        ];
    }
}

export default new PatchProductQuery();
