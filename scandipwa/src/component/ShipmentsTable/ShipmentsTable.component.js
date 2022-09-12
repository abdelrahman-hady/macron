/*
 * @category  Macron
 * @author    Opeyemi Ilesanmi <opeyemi.ilesanmi@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Link from 'Component/Link';
import Loader from 'Component/Loader';
import Pagination from 'Component/Pagination';
import { ShipmentType } from 'Type/Shipment.type';

import './ShipmentsTable.style';

/** @namespace Scandipwa/Component/ShipmentsTable/Component */
export class ShipmentsTableComponent extends PureComponent {
    static propTypes = {
        shipments: PropTypes.arrayOf(ShipmentType).isRequired,
        isLoading: PropTypes.bool.isRequired
    };

    renderOrderHeadingRow() {
        return (
            <tr>
                <th>{ __('Shipping number') }</th>
                <th>{ __('Date') }</th>
                <th>{ __('Customer') }</th>
                <th>{ __('Address') }</th>
                <th>{ __('Way of delivery') }</th>
                <th>{ __('Status') }</th>
                <th>{ __('Tracking') }</th>
                <th>{ __('Action') }</th>
            </tr>
        );
    }

    renderActionButtons() {
        return (
            <div>
                <Link to="/">{ __('View') }</Link>
                <span> | </span>
                <Link to="/">{ __('Download') }</Link>
            </div>
        );
    }

    renderTableRow(data) {
        const {
            entity_id,
            shipment_number,
            status,
            tracking_number,
            date,
            customer_name,
            address
        } = data;

        return (
            <tr key={ entity_id }>
                <td>{ shipment_number }</td>
                <td>{ date }</td>
                <td>{ customer_name }</td>
                <td>{ address }</td>
                <td>{ __('Way of delivery') }</td>
                <td>{ status }</td>
                <td>{ tracking_number }</td>
                <td>{ this.renderActionButtons() }</td>
            </tr>
        );
    }

    renderTable() {
        const { shipments } = this.props;

        return (
            <div block="ShipmentsTable" elem="Wrapper">
                <table block="ShipmentsTable">
                    <thead>
                        { this.renderOrderHeadingRow() }
                    </thead>
                    <tbody>
                        { shipments.map(this.renderTableRow.bind(this)) }
                    </tbody>
                </table>
            </div>
        );
    }

    renderPagination() {
        const { isLoading, shipments: { pageInfo = { total_pages: 1 } } } = this.props;
        const { total_pages } = pageInfo;

        return (
             <Pagination totalPages={ total_pages } isLoading={ isLoading } />
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <div block="ShipmentsTable">
                <Loader isLoading={ isLoading } />
                { this.renderPagination() }
                { this.renderTable() }
                { this.renderPagination() }
            </div>
        );
    }
}

export default ShipmentsTableComponent;
