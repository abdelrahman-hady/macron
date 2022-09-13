/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { CLIENTS_PER_PAGE } from 'Route/MyClientsPage/MyClientsPage.config';
import { Field } from 'Util/Query';

/** @namespace Scandipwa/Query/Client/Query */
export class ClientQuery {
    getClientsQuery(options) {
        const { page = 1, pageSize = CLIENTS_PER_PAGE } = options ?? {};

        return new Field('clients')
            .addArgument('currentPage', 'Int', page)
            .addArgument('pageSize', 'Int', pageSize)
            .addField(this._getClientsField())
            .addField(this._getSearchResultPageInfoField());
    }

    getCreateClientMutation(client) {
        return new Field('createClient')
            .addArgument('client', 'CreateClientInput!', client)
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

    getUpdateClientMutation(client) {
        return new Field('updateClient')
            .addArgument('client', 'UpdateClientInput!', client)
            .addFieldList(this._getClientFields());
    }

    getClientOptionsQuery() {
        return new Field('clientOptions')
            .addFieldList(this._getOptionsField());
    }

    _getOptionsField() {
        return [
            new Field('affiliations').addFieldList(this._getOptionField()),
            new Field('current_brands').addFieldList(this._getOptionField()),
            new Field('dates').addFieldList(this._getOptionField()),
            new Field('sports').addFieldList(this._getOptionField()),
            new Field('colors').addFieldList(this._getOptionField()),
            new Field('distances').addFieldList(this._getOptionField())
        ];
    }

    _getOptionField() {
        return [
            'id',
            'label'
        ];
    }

    _getClientFields() {
        return [
            'entity_id',
            'company_name',
            'address',
            'vat_number',
            'date_id',
            'date',
            'affiliation_id',
            'affiliation',
            'sport_id',
            'sport',
            'category',
            'primary_color_id',
            'primary_color',
            'secondary_color_id',
            'secondary_color',
            'current_brand_id',
            'current_brand',
            'coni_id',
            'membership_no',
            'distance_id',
            'distance',
            'contact_person',
            'mobile',
            'email',
            'is_contract_signed'
        ];
    }

    _getClientsField() {
        return new Field('items')
            .addFieldList(this._getClientFields());
    }

    _getSearchResultPageInfoField() {
        return new Field('page_info')
            .addFieldList(this._getSearchResultPageInfoFields());
    }

    _getSearchResultPageInfoFields() {
        return [
            'current_page',
            'page_size',
            'total_pages'
        ];
    }
}

export default new ClientQuery();
