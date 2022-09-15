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
        const { page = 1, pageSize = SHIPMENTS_PER_PAGE } = options ?? {};

        return new Field('shipments')
            .addArgument('currentPage', 'Int', page)
            .addArgument('pageSize', 'Int', pageSize)
            .addField(this._getShipmentsField());
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
            'address'
        ];
    }
}

export default new ShipmentQuery();
