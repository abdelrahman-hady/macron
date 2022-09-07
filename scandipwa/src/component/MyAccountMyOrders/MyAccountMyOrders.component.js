/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';

import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import Loader from 'Component/Loader';
import MyAccountOrderTableRow from 'Component/MyAccountOrderTableRow';
import {
    MyAccountMyOrders as SourceMyAccountMyOrders
} from 'SourceComponent/MyAccountMyOrders/MyAccountMyOrders.component';

import './MyAccountMyOrders.override.style.scss';

/** @namespace Scandipwa/Component/MyAccountMyOrders/Component */
export class MyAccountMyOrdersComponent extends SourceMyAccountMyOrders {
    static propTypes = {
        ...super.propTypes,
        ordersPerPageList: PropTypes.string.isRequired,
        ordersPerPage: PropTypes.number.isRequired
    };

    renderOrdersPerPage() {
        const { ordersPerPageList, ordersPerPage, onOrderPerPageChange } = this.props;

        const ordersPerPageOptions = [];

        if (ordersPerPageList) {
            ordersPerPageList.split(',').forEach((value) => {
                const perPage = +value;
                ordersPerPageOptions.push({ id: perPage, label: perPage, value: perPage });
            });
        } else {
            ordersPerPageOptions.push({ label: ordersPerPage, value: ordersPerPage });
        }

        return (
            <div block="MyAccountMyOrders" elem="PerPageDropdown">
                <Field
                  type={ FIELD_TYPE.select }
                  attr={ {
                      id: 'orders-per-page-dropdown',
                      name: 'orders-per-page-dropdown',
                      value: ordersPerPage,
                      noPlaceholder: true
                  } }
                  events={ {
                      onChange: onOrderPerPageChange
                  } }
                  options={ ordersPerPageOptions }
                />
                <span>{ __('per page') }</span>
            </div>
        );
    }

    renderFilters() {
        const {
            onDateFromSelectorChange,
            onDateToSelectorChange,
            dateFrom,
            dateTo
        } = this.props;

        return (
            <div block="MyAccountMyOrders" elem="Filters">
                <div block="MyAccountMyOrders" elem="DateFilter">
                    <p>{ __('Data from:') }</p>
                    <Field
                      type={ FIELD_TYPE.date }
                      attr={ {
                          id: 'date-from-selector',
                          name: 'date-from-selector',
                          value: dateFrom
                      } }
                      events={ {
                          onChange: onDateFromSelectorChange
                      } }
                    />
                </div>
                <div block="MyAccountMyOrders" elem="DateFilter">
                    <p>{ __('Data to:') }</p>
                    <Field
                      type={ FIELD_TYPE.date }
                      attr={ {
                          id: 'date-to-selector',
                          name: 'date-to-selector',
                          value: dateTo
                      } }
                      events={ {
                          onChange: onDateToSelectorChange
                      } }
                    />
                </div>
            </div>
        );
    }

    renderOrderRow(order) {
        const { id, order_date, base_order_info: { id: defaultId } = {} } = order;
        const { dateFrom, dateTo } = this.props;
        const adjustedOrderDate = order_date !== undefined ? order_date.split(' ')[0] : null;
        const orderDate = new Date(adjustedOrderDate).getDate();
        const fromDate = new Date(dateFrom).getDate();
        const toDate = new Date(dateTo).getDate();

        if (orderDate < fromDate) {
            return null;
        } if (orderDate > toDate) {
            return null;
        }

        return (
            <MyAccountOrderTableRow
              key={ id || defaultId }
              order={ order }
            />
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <div block="MyAccountMyOrders">
                <Loader isLoading={ isLoading } />
                { this.renderFilters() }
                { this.renderOrdersPerPage() }
                { this.renderTable() }
                { this.renderPagination() }
                { this.renderOrdersPerPage() }
            </div>
        );
    }
}

export default MyAccountMyOrdersComponent;
