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
import { OrdersListType } from 'Type/Order.type';

import './DashboardOrdersTable.style';

/** @namespace Scandipwa/Component/DashboardOrdersTable/Component */
export class DashboardOrdersTableComponent extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        onViewAllButtonClick: PropTypes.func.isRequired,
        orderList: OrdersListType.isRequired
    };

    renderCompactOrderHeadingRow() {
        return (
            <tr>
                <th>{ __('Order number') }</th>
                <th>{ __('Customer') }</th>
                <th>{ __('Date') }</th>
                <th>{ __('Total') }</th>
                <th>{ __('Status') }</th>
                { /* eslint-disable-next-line jsx-a11y/control-has-associated-label */ }
                <th />
            </tr>
        );
    }

    renderCompactActionButtons(order_number) {
        return (
            <div>
                <Link to={ appendWithStoreCode(`sales/order/view/order_id/${order_number}/`) }>
                    { __('View Order') }
                </Link>
                <span> | </span>
                <Link to={ appendWithStoreCode(`sales/order/view/order_id/${order_number}/reorder`) }>
                    { __('Reorder') }
                </Link>
            </div>
        );
    }

    renderTableTitle() {
        return (
            <h2 block="DashboardOrdersTable" elem="Title">
                { __('Order History') }
            </h2>
        );
    }

    renderViewAllButton() {
        const { onViewAllButtonClick } = this.props;
        return (
            <button block="DashboardOrdersTable" elem="Button" onClick={ onViewAllButtonClick }>
                { __('View All Orders') }
            </button>
        );
    }

    renderCompactTable() {
        const { orderList } = this.props;
        if (typeof orderList.items === 'undefined') {
            return '';
        }

        return (
            <div block="DashboardOrdersTable" elem="Wrapper">
                { this.renderTableTitle() }
                { this.renderViewAllButton() }
                <table block="DashboardOrdersTable">
                    <thead>
                        { this.renderCompactOrderHeadingRow() }
                    </thead>
                    <tbody>
                        { orderList.items.map((orderItem) => (
                            <tr key={ orderItem.id }>
                            <td>{ orderItem.id }</td>
                            <td>{ orderItem.user_customer_name }</td>
                            <td>{ orderItem.order_date }</td>
                            <td>
                                { `${orderItem.total.grand_total.value}
                                ${formatCurrency(orderItem.total.grand_total.currency)}` }
                            </td>
                            <td>{ orderItem.status }</td>
                            <td>{ this.renderCompactActionButtons(orderItem.id) }</td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <div block="DashboardOrdersTable">
                <Loader isLoading={ isLoading } />
                { this.renderCompactTable() }
            </div>
        );
    }
}

export default DashboardOrdersTableComponent;
