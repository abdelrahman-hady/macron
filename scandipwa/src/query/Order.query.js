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
    getOrdersByKeywordQuery(keyword) {
        return new Field('OrdersByKeyword')
            .addArgument('keyword', 'String!', keyword)
            .addFieldList(this._getOrderItemsFields(false));
    }

    _getOrderItemsFields(isSingleOrder) {
        const basicFields = [
            ...super._getOrderItemsFields(isSingleOrder),
            'internal_note',
            'reference_note',
            'user_customer_name',
            'sap_order_id'
        ];

        if (isSingleOrder) {
            return [...basicFields, ...super._getSingleOrderFields()];
        }

        return basicFields;
    }

    _getOrderItemsField(isSingleOrder) {
        return new Field('items')
            .addFieldList(this._getOrderItemsFields(isSingleOrder));
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
            orderId, page = 1, pageSize = ORDERS_PER_PAGE, filterOptions, isSapOrderId
        } = options || {};
        const ordersField = new Field('orders');

        if (isSapOrderId) {
            return ordersField
                .addArgument('filter', 'CustomerOrdersFilterInput', { sap_order_id: { eq: orderId } })
                .addFieldList(this._getOrdersFields(true));
        }

        if (orderId) {
            return ordersField
                .addArgument('filter', 'CustomerOrdersFilterInput', { entity_id: { eq: orderId } })
                .addFieldList(this._getOrdersFields(true));
        }

        const { status, user_customer_name } = filterOptions;

        const filter = { };
        if (status) {
            filter.status = { eq: status };
        }

        if (user_customer_name) {
            filter.user_customer_name = { eq: user_customer_name };
        }

        if (Object.keys(filter).length) {
            ordersField.addArgument('filter', 'CustomerOrdersFilterInput', filter);
        }

        return ordersField
            .addArgument('currentPage', 'Int', page)
            .addArgument('pageSize', 'Int', pageSize)
            .addFieldList(this._getOrdersFields());
    }
}

export default new OrderQuery();
