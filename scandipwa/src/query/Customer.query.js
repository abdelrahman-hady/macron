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
}

export default new CustomerQuery();
