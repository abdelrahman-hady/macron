/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import Link from 'Component/Link';
import Loader from 'Component/Loader';
import { InvoiceType } from 'Type/Invoice.type';

/** @namespace Scandipwa/Route/InvoicesPage/Component */
export class InvoicesPageComponent extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool,
        invoices: PropTypes.arrayOf(InvoiceType).isRequired
    };

    static defaultProps = {
        isLoading: false
    };

    renderHeading() {
        return (
            <h1>
                { __('Invoices') }
            </h1>
        );
    }

    renderInvoiceHeadingRow() {
        return (
            <tr>
                <th>{ __('Invoice number') }</th>
                <th>{ __('Date') }</th>
                <th>{ __('customer') }</th>
                <th>{ __('Address') }</th>
                <th>{ __('Total') }</th>
                <th>{ __('Status') }</th>
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
            id, invoice_number, date, customer, address, grand_total, status
        } = data;

        return (
            <tr key={ id }>
                <td>{ invoice_number }</td>
                <td>{ date }</td>
                <td>{ customer }</td>
                <td>{ address }</td>
                <td>{ grand_total }</td>
                <td>{ status }</td>
                <td>{ this.renderActionButtons(id) }</td>
            </tr>
        );
    }

    renderInvoicesTable() {
        const { invoices } = this.props;

        return (
            <div block="InvoicesTable" elem="Wrapper">
                <table block="InvoicesTable">
                    <thead>
                        { this.renderInvoiceHeadingRow() }
                    </thead>
                    <tbody>
                        { invoices.map(this.renderTableRow.bind(this)) }
                    </tbody>
                </table>
            </div>
        );
    }

    renderMainContent() {
        return (
            <ContentWrapper label="Invoices Page">
                { this.renderHeading() }
                { this.renderInvoicesTable() }
            </ContentWrapper>
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <main block="InvoicesPage">
                <Loader isLoading={ isLoading } />
                { this.renderMainContent() }
            </main>
        );
    }
}

export default InvoicesPageComponent;
