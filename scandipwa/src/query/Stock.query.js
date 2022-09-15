/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { Field } from 'Util/Query';

/** @namespace Scandipwa/Query/Stock/Query */
export class StockQuery {
    getStockQuery(skus, warehouses) {
        return new Field('pimStock')
            .addArgument('SKU', '[String]!', skus)
            .addArgument('Warehouse', '[String]!', warehouses)
            .addFieldList(this._getStockFields());
    }

    _getStockFields() {
        return [
            'id',
            'sku',
            'qty',
            'warehouse',
            this._getArrivalsField()
        ];
    }

    _getArrivalsField() {
        return new Field('newArrivals')
            .addFieldList(['qty', 'date']);
    }
}

export default new StockQuery();
