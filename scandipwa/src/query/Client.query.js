/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { Field } from 'Util/Query';

/** @namespace Scandipwa/Query/Client/Query */
export class ClientQuery {
    getClientsQuery() {
        return new Field('clients')
            .addFieldList(this._getClientFields());
    }

    getClientQuery(clientId) {
        return new Field('client')
            .addArgument('client_id', 'Int!', clientId)
            .addFieldList(this._getClientFields());
    }

    getDeleteClientMutation(clientId) {
        return new Field('deleteClient')
            .addArgument('client_id', 'Int!', clientId)
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
