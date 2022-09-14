/*
 * @category  Macron
 * @author    Opeyemi Ilesanmi <opeyemi.ilesanmi@scandiweb.com | info@scandiweb.com>
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

import './ShipmentsTable.style';

/** @namespace Scandipwa/Component/ShipmentsTable/Component */
export class ShipmentsTableComponent extends PureComponent {
    static propTypes = {
        shipments: PropTypes.arrayOf(ShipmentType).isRequired,
        isLoading: PropTypes.bool.isRequired,
        isCompact: PropTypes.bool.isRequired,
        onViewAllButtonClick: PropTypes.func.isRequired
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
                { /* eslint-disable-next-line jsx-a11y/control-has-associated-label */ }
                <th />
            </tr>
        );
    }

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

    renderActionButtons(shipment_number) {
        return (
            <div>
                <Link to={ appendWithStoreCode(`/shipments/${shipment_number}`) }>{ __('View Shipment') }</Link>
                <span> | </span>
                <Link to={ appendWithStoreCode('/') }>{ __('Download') }</Link>
            </div>
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
            <h2 block="ShipmentsTable" elem="Title">
                { __('Upcoming Shipments') }
            </h2>
        );
    }

    renderViewAllButton() {
        const { onViewAllButtonClick } = this.props;
        return (
            <button block="ShipmentsTable" elem="Button" onClick={ onViewAllButtonClick }>
                { __('View All Shipments') }
            </button>
        );
    }

    renderTableRow(data) {
        const {
            shipment_number,
            status,
            tracking_number,
            date,
            customer_name,
            address
        } = data;

        return (
            <tr key={ tracking_number }>
                <td>{ shipment_number }</td>
                <td>{ date }</td>
                <td>{ customer_name }</td>
                <td>{ address }</td>
                <td>{ __('Way of delivery') }</td>
                <td>{ status }</td>
                <td>{ tracking_number }</td>
                <td>{ this.renderActionButtons(shipment_number) }</td>
            </tr>
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

    renderCompactTable() {
        const { shipments } = this.props;

        return (
            <div block="ShipmentsTable" elem="Wrapper">
                { this.renderTableTitle() }
                { this.renderViewAllButton() }
                <table block="ShipmentsTable">
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
        const { isLoading, isCompact } = this.props;

        return (
            <div block="ShipmentsTable">
                <Loader isLoading={ isLoading } />
                { /* eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-conditional */ }
                { isCompact ? this.renderCompactTable() : this.renderTable() }
            </div>
        );
    }
}

export default ShipmentsTableComponent;
