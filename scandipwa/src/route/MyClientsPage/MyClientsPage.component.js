/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import Field from '@scandipwa/scandipwa/src/component/Field';
import FIELD_TYPE from '@scandipwa/scandipwa/src/component/Field/Field.config';
import Link from '@scandipwa/scandipwa/src/component/Link';
import { appendWithStoreCode } from '@scandipwa/scandipwa/src/util/Url';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import AddIcon from 'Component/AddIcon';
import ContentWrapper from 'Component/ContentWrapper';
import Loader from 'Component/Loader';
import { ClientType } from 'Type/Client.type';
import { getListViewAllowedOptions } from 'Util/Config';

import { MY_CLIENTS_URL } from './MyClientsPage.config';

import './MyClientsPage.style.scss';

/** @namespace Scandipwa/Route/MyClientsPage/Component */
export class MyClientsPageComponent extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool,
        onCreateClientHandler: PropTypes.func.isRequired,
        clients: PropTypes.arrayOf(ClientType).isRequired,
        clientsPerPageList: PropTypes.string.isRequired,
        clientsPerPage: PropTypes.number.isRequired,
        onClientsPerPageChange: PropTypes.func.isRequired
    };

    static defaultProps = {
        isLoading: false
    };

    renderHeading() {
        return (
            <h1>
                { __('My clients') }
            </h1>
        );
    }

    renderCreateClient() {
        const { onCreateClientHandler } = this.props;
        return (
            <button block="Button" mods={ { isHollow: true } } onClick={ onCreateClientHandler }>
                <AddIcon />
                { __('Create new client') }
            </button>
        );
    }

    renderPerPageDropdown() {
        const { clientsPerPageList, clientsPerPage, onClientsPerPageChange } = this.props;

        const clientsPerPageOptions = getListViewAllowedOptions(clientsPerPageList);

        return (
            <div block="MyClientsPage" elem="PerPageDropdown">
                <Field
                  type={ FIELD_TYPE.select }
                  attr={ {
                      id: 'clients-per-page-dropdown',
                      name: 'clients-per-page-dropdown',
                      value: clientsPerPage,
                      noPlaceholder: true
                  } }
                  events={ {
                      onChange: onClientsPerPageChange
                  } }
                  options={ clientsPerPageOptions }
                />
                <span>{ __('per page') }</span>
            </div>
        );
    }

    renderOrderHeadingRow() {
        return (
            <tr>
                <th>{ __('Customer') }</th>
                <th>{ __('Registered address') }</th>
                <th>{ __('Action') }</th>
            </tr>
        );
    }

    renderActionButtons(clientId) {
        const profileUrl = `${MY_CLIENTS_URL}/${clientId}`;

        return (
            <div>
                <Link to={ appendWithStoreCode(profileUrl) }>{ __('View profile') }</Link>
                <span> | </span>
                <Link to="/">{ __('Quote history') }</Link>
            </div>
        );
    }

    renderTableRow(data) {
        const { entity_id, company_name, address } = data;

        return (
            <tr key={ entity_id }>
                <td>{ company_name }</td>
                <td>{ address }</td>
                <td>{ this.renderActionButtons(entity_id) }</td>
            </tr>
        );
    }

    renderTable() {
        const { clients } = this.props;

        return (
            <div block="MyClientsPage">
                <table block="MyClientsPage" elem="Table">
                    <thead>
                        { this.renderOrderHeadingRow() }
                    </thead>
                    <tbody>
                        { clients.map(this.renderTableRow.bind(this)) }
                    </tbody>
                </table>
            </div>
        );
    }

    renderMainContent() {
        return (
            <ContentWrapper label="My Clients Page">
                { this.renderHeading() }
                { this.renderCreateClient() }
                { this.renderPerPageDropdown() }
                { this.renderTable() }
                { this.renderPerPageDropdown() }
            </ContentWrapper>
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <main block="MyClientsPage">
                <Loader isLoading={ isLoading } />
                { this.renderMainContent() }
            </main>
        );
    }
}

export default MyClientsPageComponent;
