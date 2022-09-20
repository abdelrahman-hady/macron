/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @author    Abdelrahman Hady <abdelrahman.hady@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { Field } from 'Util/Query';

/** @namespace Scandipwa/Query/Customer/Query */
export class CustomerQuery {
    getPartnerCompanyNamesQuery() {
        return new Field('getPartnerCompanies')
            .addField('currentCustomerId')
            .addField(this._getPartnerFiled());
    }

    getDefaultShippingAddressQuery() {
        return new Field('getDefaultShippingAddress')
            .addField('address');
    }

    _getPartnerFiled() {
        return new Field('partnerCompanies')
            .addFieldList(['companyName', 'companyId']);
    }
}

export default new CustomerQuery();
