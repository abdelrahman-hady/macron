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
            shipment_number,
            status,
            tracking_number,
            date,
            customer_name,
            address
        } = data;

        return (
            <tr key={ __(tracking_number) }>
                <td>{ __(shipment_number) }</td>
                <td>{ __(date) }</td>
                <td>{ __(customer_name) }</td>
                <td>{ __(address) }</td>
                <td>__(Way of delivery)</td>
                <td>{ __(status) }</td>
                <td>{ __(tracking_number) }</td>
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

    render() {
        const { isLoading } = this.props;

        return (
            <div block="ShipmentsTable">
                <Loader isLoading={ isLoading } />
                { this.renderTable() }
            </div>
        );
    }
}

export default ShipmentsTableComponent;
