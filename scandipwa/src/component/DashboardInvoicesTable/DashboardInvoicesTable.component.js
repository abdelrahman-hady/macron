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
import { formatCurrency } from 'SourceUtil/Price';
import { appendWithStoreCode } from 'SourceUtil/Url';
import { ShipmentType } from 'Type/Shipment.type';

import './DashboardInvoicesTable.style';

/** @namespace Scandipwa/Component/DashboardInvoicesTable/Component */
export class DashboardInvoicesTableComponent extends PureComponent {
    static propTypes = {
        invoices: PropTypes.arrayOf(ShipmentType).isRequired,
        isLoading: PropTypes.bool.isRequired,
        onViewAllButtonClick: PropTypes.func.isRequired
    };

    renderCompactOrderHeadingRow() {
        return (
            <tr>
                <th>{ __('Invoice number') }</th>
                <th>{ __('Order Holder') }</th>
                <th>{ __('Invoice Date') }</th>
                <th>{ __('Due Date') }</th>
                <th>{ __('Total') }</th>
                <th>{ __('Status') }</th>
                { /* eslint-disable-next-line jsx-a11y/control-has-associated-label */ }
                <th />
            </tr>
        );
    }

    renderCompactActionButtons(invoice_num) {
        return (
            <div>
                <Link to={ appendWithStoreCode(`/invoices/${invoice_num}`) }>{ __('View Invoice') }</Link>
            </div>
        );
    }

    renderTableTitle() {
        return (
            <h2 block="DashboardInvoicesTable" elem="Title">
                { __('Invoice Summary') }
            </h2>
        );
    }

    renderViewAllButton() {
        const { onViewAllButtonClick } = this.props;
        return (
            <button block="DashboardInvoicesTable" elem="Button" onClick={ onViewAllButtonClick }>
                { __('View All invoices') }
            </button>
        );
    }

    renderCompactTableRow(data) {
        const {
            invoice_number,
            firstname,
            lastname,
            currency,
            grand_total,
            due_date,
            status,
            date
        } = data;

        return (
            <tr key={ invoice_number }>
                <td>{ invoice_number }</td>
                <td>{ `${firstname} ${lastname}` }</td>
                <td>{ date }</td>
                <td>{ due_date }</td>
                <td>{ `${grand_total} ${formatCurrency(currency)}` }</td>
                <td>{ status }</td>
                <td>{ this.renderCompactActionButtons(invoice_number) }</td>
            </tr>
        );
    }

    renderNoInvoice() {
        return <tr><td colSpan={ 7 }>{ __('You have no invoices') }</td></tr>;
    }

    renderCompactTable() {
        const { invoices } = this.props;

        return (
            <div block="DashboardInvoicesTable" elem="Wrapper">
                { this.renderTableTitle() }
                { this.renderViewAllButton() }
                <table block="DashboardInvoicesTable">
                    <thead>
                        { this.renderCompactOrderHeadingRow() }
                    </thead>
                    <tbody>
                        { /* eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-conditional */ }
                        { invoices.length > 0
                            ? invoices.map(this.renderCompactTableRow.bind(this))
                            : this.renderNoInvoice() }
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <div block="DashboardInvoicesTable">
                <Loader isLoading={ isLoading } />
                { this.renderCompactTable() }
            </div>
        );
    }
}

export default DashboardInvoicesTableComponent;
