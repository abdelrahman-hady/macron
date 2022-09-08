/*
 * @category  Macron
 * @authors   Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 *            Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { ORDERS_PER_PAGE } from 'Component/MyAccountMyOrders/MyAccountMyOrders.config';
import {
    OrderQuery as SourceOrderQuery
} from 'SourceQuery/Order.query';
import { Field } from 'Util/Query';

/**
 * Order Query
 * @class OrderQuery
 * @namespace Scandipwa/Query/Order/Query */
export class OrderQuery extends SourceOrderQuery {
    _getOrderItemsFields(isSingleOrder) {
        const basicFields = [
            ...super._getOrderItemsFields(isSingleOrder),
            'internal_note',
            'reference_note',
            'user_customer_name'
        ];

        if (isSingleOrder) {
            return [...basicFields, ...super._getSingleOrderFields()];
        }

        return basicFields;
    }

    _getDownloadableFields() {
        return [
            ...super._getDownloadableFields(),
            'internal_note',
            'reference_note'
        ];
    }

    _getOrdersField(options) {
        const { orderId, page = 1, pageSize = ORDERS_PER_PAGE } = options || {};
        const ordersField = new Field('orders');

        if (orderId) {
            return ordersField
                .addArgument('filter', 'CustomerOrdersFilterInput', { entity_id: { eq: orderId } })
                .addFieldList(this._getOrdersFields(true));
        }

        return ordersField
            .addArgument('currentPage', 'Int', page)
            .addArgument('pageSize', 'Int', pageSize)
            .addFieldList(this._getOrdersFields());
    }
}

export default new OrderQuery();
