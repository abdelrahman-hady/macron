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
            'reference_note'
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

        const filter = {};

        if (orderId) {
            filter.entity_id = { eq: orderId };
        }

        if (dateFrom) {
            filter.created_at = { ...filter.created_at, gteq: dateFrom };
        }

        if (dateTo) {
            filter.created_at = { ...filter.created_at, lteq: dateTo };
        }

        if (Object.keys(filter).length) {
            ordersField
                .addArgument('filter', 'CustomerOrdersFilterInput', filter);
        }

        return ordersField
            .addArgument('currentPage', 'Int', page)
            .addArgument('pageSize', 'Int', pageSize)
            .addFieldList(this._getOrdersFields(false));
    }
}

export default new OrderQuery();
