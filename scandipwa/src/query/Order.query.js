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
    getOrdersByKeywordQuery(page, pageSize, keyword) {
        return new Field('OrdersByKeyword')
            .addArgument('currentPage', 'String!', page)
            .addArgument('pageSize', 'String!', pageSize)
            .addArgument('keyword', 'String!', keyword)
            .addFieldList(this._getOrdersFields(true));
    }

    _getOrderItemsFields(isSingleOrder) {
        const basicFields = [
            ...super._getOrderItemsFields(isSingleOrder),
            'internal_note',
            'reference_note',
            'sap_order_id'
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
        const {
            orderId, page = 1, pageSize = ORDERS_PER_PAGE, filterOptions: { dateFrom, dateTo } = {}
        } = options || {};
        const ordersField = new Field('orders');

        if (orderId !== undefined ? orderId.includes('sap') : null) {
        // 'sap' might have to be replaced with something else when real sap_order_id format will be known.
            ordersField
                .addArgument('filter', 'CustomerOrdersFilterInput', { sap_order_id: { eq: orderId } })
                .addFieldList(this._getOrdersFields(true));
        }

        if (orderId) {
            ordersField
                .addArgument('filter', 'CustomerOrdersFilterInput', { entity_id: { eq: orderId } })
                .addFieldList(this._getOrdersFields(true));
        }

        if (dateFrom) {
            ordersField
                .addArgument('filter', 'CustomerOrdersFilterInput', { created_at: { gteq: dateFrom } })
                .addFieldList(this._getOrdersFields(false));
        }

        if (dateTo) {
            ordersField
                .addArgument('filter', 'CustomerOrdersFilterInput', { created_at: { lteq: dateTo } })
                .addFieldList(this._getOrdersFields(false));
        }

        return ordersField
            .addArgument('currentPage', 'Int', page)
            .addArgument('pageSize', 'Int', pageSize)
            .addFieldList(this._getOrdersFields(false));
    }
}

export default new OrderQuery();
