/*
 * @category  Macron
 * @author    Saad Amir <saad.amir@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Link from 'Component/Link';
import Loader from 'Component/Loader';
import { appendWithStoreCode } from 'SourceUtil/Url';
import { ShipmentType } from 'Type/Shipment.type';

import './DashboardShipmentsTable.style';

/** @namespace Scandipwa/Component/DashboardShipmentsTable/Component */
export class DashboardShipmentsTableComponent extends PureComponent {
    static propTypes = {
        shipments: PropTypes.arrayOf(ShipmentType).isRequired,
        isLoading: PropTypes.bool.isRequired,
        onViewAllButtonClick: PropTypes.func.isRequired
    };

    renderCompactOrderHeadingRow() {
        return (
            <tr>
                <th>{ __('Shipping number') }</th>
                <th>{ __('Customer') }</th>
                <th>{ __('Date') }</th>
                <th>{ __('Tracking') }</th>
                <th>{ __('Status') }</th>
                { /* eslint-disable-next-line jsx-a11y/control-has-associated-label */ }
                <th />
            </tr>
        );
    }

    renderCompactActionButtons(shipment_number, packing_link) {
        return (
            <div>
                <Link to={ appendWithStoreCode(`/shipments/${shipment_number}`) }>{ __('View Shipment') }</Link>
                <span> | </span>
                <Link to={ packing_link } target="_blank">{ __('Packing List') }</Link>
            </div>
        );
    }

    renderTableTitle() {
        return (
            <h2 block="DashboardShipmentsTable" elem="Title">
                { __('Upcoming Shipments') }
            </h2>
        );
    }

    renderViewAllButton() {
        const { onViewAllButtonClick } = this.props;
        return (
            <button block="DashboardShipmentsTable" elem="Button" onClick={ onViewAllButtonClick }>
                { __('View All Shipments') }
            </button>
        );
    }

    renderCompactTableRow(data) {
        const {
            shipment_number,
            status,
            tracking_number,
            date,
            customer_name,
            packing_list_link
        } = data;

        return (
            <tr key={ tracking_number }>
                <td>{ shipment_number }</td>
                <td>{ customer_name }</td>
                <td>{ date }</td>
                <td>{ tracking_number }</td>
                <td>{ status }</td>
                <td>{ this.renderCompactActionButtons(shipment_number, packing_list_link) }</td>
            </tr>
        );
    }

    renderCompactTable() {
        const { shipments } = this.props;

        return (
            <div block="DashboardShipmentsTable" elem="Wrapper">
                { this.renderTableTitle() }
                { this.renderViewAllButton() }
                <table block="DashboardShipmentsTable">
                    <thead>
                        { this.renderCompactOrderHeadingRow() }
                    </thead>
                    <tbody>
                        { shipments.map(this.renderCompactTableRow.bind(this)) }
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <div block="DashboardShipmentsTable">
                <Loader isLoading={ isLoading } />
                { this.renderCompactTable() }
            </div>
        );
    }
}

export default DashboardShipmentsTableComponent;
