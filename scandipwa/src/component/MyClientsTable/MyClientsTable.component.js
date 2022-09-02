/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Link from 'Component/Link';
import Loader from 'Component/Loader';
import { MY_CLIENTS_URL } from 'Route/MyClientsPage/MyClientsPage.config';
import { ClientType } from 'Type/Client.type';
import { appendWithStoreCode } from 'Util/Url';

import './MyClientsTable.style';

/** @namespace Scandipwa/Component/MyClientsTable/Component */
export class MyClientsTableComponent extends PureComponent {
    static propTypes = {
        clients: PropTypes.arrayOf(ClientType).isRequired,
        isLoading: PropTypes.bool.isRequired
    };

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
            <div block="MyClientsTable" elem="Wrapper">
                <table block="MyClientsTable">
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

    render() {
        const { isLoading } = this.props;

        return (
            <div block="MyClientsTable">
                <Loader isLoading={ isLoading } />
                { this.renderTable() }
            </div>
        );
    }
}

export default MyClientsTableComponent;
