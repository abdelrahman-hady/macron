/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
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

    _getPartnerFiled() {
        return new Field('partnerCompanies')
            .addFieldList(['companyName', 'companyId']);
    }

    getBusinessLineQuery(businessId) {
        return new Field('getCustomerBusinessLine')
            .addArgument('businessId', 'String!', businessId)
            .addFieldList(['businessLine', 'b2bProfileId']);
    }
}

export default new CustomerQuery();
