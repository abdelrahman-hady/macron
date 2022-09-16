/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { TYPE_CUSTOMER } from 'Component/OrderTypePopup/OrderTypePopup.config';
import {
    ProductListQuery as SourceProductListQuery
} from 'SourceQuery/ProductList.query';
import { Field } from 'Util/Query';
import getStore from 'Util/Store';

/** @namespace Scandipwa/Query/ProductList/Query */
export class ProductListQuery extends SourceProductListQuery {
    _getPriceRangeField() {
        const priceRange = new Field('price_range')
            .addFieldList(this._getPriceRangeFields());

        const { CustomCartDataReducer: { orderType, selectedCustomer } } = getStore().getState();

        if (orderType === TYPE_CUSTOMER) {
            priceRange.addArgument('customer', 'String', selectedCustomer);
        }

        return priceRange;
    }

    _getPriceRangeFields() {
        return [
            this._getRetailPriceField(),
            this._getWholesalePriceField(),
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
