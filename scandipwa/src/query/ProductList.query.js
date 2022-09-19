/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import {
    ProductListQuery as SourceProductListQuery
} from 'SourceQuery/ProductList.query';
import { Field } from 'Util/Query';

/** @namespace Scandipwa/Query/ProductList/Query */
export class ProductListQuery extends SourceProductListQuery {
    _getPriceRangeField() {
        return new Field('price_range')
            .addFieldList(this._getPriceRangeFields());
    }

    getDiscountPrices(id, selectedCustomer = null) {
        return new Field('discount_prices')
            .addFieldList(this._getDiscountPricesFields())
            .addArgument('id', 'String!', id)
            .addArgument('customer', 'String', selectedCustomer);
    }

    _getPriceRangeFields() {
        return [
            this._getRetailPriceField(),
            this._getWholesalePriceField()
        ];
    }

    _getDiscountPricesFields() {
        return [
            this._getYourWspField(),
            this._getCustomerRrpField()
        ];
    }

    _getRetailPriceField() {
        return new Field('retail_price')
            .addFieldList(this._getCustomPriceFields());
    }

    _getWholesalePriceField() {
        return new Field('wholesale_price')
            .addFieldList(this._getCustomPriceFields());
    }

    _getYourWspField() {
        return new Field('your_wsp')
            .addFieldList(this._getCustomPriceFields());
    }

    _getCustomerRrpField() {
        return new Field('customer_rrp')
            .addFieldList(this._getCustomPriceFields());
    }

    _getCustomPriceFields() {
        return [
            'value',
            'currency'
        ];
    }
}

export default new ProductListQuery();
