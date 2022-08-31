import { Field } from 'Util/Query';

/** @namespace Scandipwa/Query/Client/Query */
export class ClientQuery {
    getClientsQuery() {
        return new Field('clients')
            .addFieldList(this._getClientFields());
    }

    _getClientFields() {
        return [
            'entity_id',
            'address',
            'affiliation',
            'category',
            'company_name',
            'coni_id',
            'contact_person',
            'contract_expiracy_date',
            'current_brand',
            'distance',
            'email',
            'membership_no',
            'mobile',
            'primary_color',
            'secondary_color',
            'sport',
            'vat_number'
        ];
    }
}

export default new ClientQuery();
