/*
 * @category  Macron
 * @author    Opeyemi Ilesanmi <opeyemi.ilesanmi@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { Field } from 'Util/Query';

import { SHIPMENTS_PER_PAGE } from '../route/Shipments/Shipments.config';

/** @namespace Scandipwa/Query/Shipment/Query */
export class ShipmentQuery {
    getShipmentsQuery(options) {
        const {
            page = 1, pageSize = SHIPMENTS_PER_PAGE, filterOptions
        } = options ?? {};

        const shipmentsField = new Field('shipments');

        // if (shipmentId) {
        //     return shipmentsField
        //         .addArgument('filter', 'ShipmentsFilterInput', { entity_id: { eq: shipmentId } })
        //         .addFieldList(this._getShipmentFields());
        // }

        const { status, customer_name } = filterOptions;

        const filter = { };

        if (status) {
            filter.status = { eq: status };
        }

        if (customer_name) {
            filter.customer_name = { eq: customer_name };
        }

        if (Object.keys(filter).length) {
            shipmentsField.addArgument('filter', 'ShipmentsFilterInput', filter);
        }

        return shipmentsField
            .addArgument('currentPage', 'Int', page)
            .addArgument('pageSize', 'Int', pageSize)
            .addField(this._getShipmentsField())
            .addField(this._getPageInfoField());
    }

    getShipmentsByKeywordQuery(keyword) {
        return new Field('shipmentsByKeyword')
            .addArgument('keyword', 'String!', keyword)
            .addFieldList(this._getShipmentFields());
    }

    _getPageInfoField() {
        return new Field('page_info')
            .addFieldList(this._getPageInfoFields());
    }

    _getShipmentsField() {
        return new Field('items')
            .addFieldList(this._getShipmentFields());
    }

    _getShipmentFields() {
        return [
            'entity_id',
            'shipment_number',
            'status',
            'tracking_number',
            'date',
            'customer_name',
            'address',
            'packing_list_link'
        ];
    }

    _getPageInfoFields() {
        return [
            'current_page',
            'page_size',
            'total_pages'
        ];
    }
}

export default new ShipmentQuery();
