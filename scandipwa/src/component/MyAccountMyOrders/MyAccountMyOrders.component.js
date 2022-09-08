/* eslint-disable react/forbid-prop-types */
/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @author    Mohammed Komsany <mohammed.komsany@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';

import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import Loader from 'Component/Loader';
import {
    MyAccountMyOrders as SourceMyAccountMyOrders
} from 'SourceComponent/MyAccountMyOrders/MyAccountMyOrders.component';

import './MyAccountMyOrders.override.style.scss';

/** @namespace Scandipwa/Component/MyAccountMyOrders/Component */
export class MyAccountMyOrdersComponent extends SourceMyAccountMyOrders {
    static propTypes = {
        ...super.propTypes,
        ordersPerPageList: PropTypes.string.isRequired,
        ordersPerPage: PropTypes.number.isRequired,
        sortOptions: PropTypes.object.isRequired,
        updateOptions: PropTypes.func.isRequired
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

    renderOrderHeadingRow() {
        return (
            <tr>
                <th>{ __('Order') }</th>
                <th>{ __('Customer') }</th>
                <th>{ __('Date') }</th>
                <th>{ __('Status') }</th>
                <th block="hidden-mobile">{ __('Total') }</th>
            </tr>
        );
    }

    renderSortByCustomerName() {
        const {
            sortOptions: { user_customer_name }, getAvailableSortOptions, formatToFieldOptions, updateOptions
        } = this.props;

        return (
            <Field
              type={ FIELD_TYPE.select }
              label={ __('Sort by customer') }
              mix={ { block: 'MyAccountMyOrders', elem: 'SortByCustomer' } }
              options={ formatToFieldOptions(getAvailableSortOptions().user_customer_name) }
              value={ user_customer_name }
              events={ {
                  onChange: (val) => {
                      updateOptions({
                          user_customer_name: +val === 0 ? null : getAvailableSortOptions().user_customer_name[+val - 1]
                      });
                  }
              } }
            />
        );
    }

    renderSortByOrderStatus() {
        const {
            sortOptions: { status }, getAvailableSortOptions, formatToFieldOptions, updateOptions
        } = this.props;

        return (
            <Field
              type={ FIELD_TYPE.select }
              label={ __('Sort by status') }
              mix={ { block: 'MyAccountMyOrders', elem: 'SortByStatus' } }
              options={ formatToFieldOptions(getAvailableSortOptions().status) }
              value={ status }
              events={ {
                  onChange: (val) => {
                      updateOptions({ status: +val === 0 ? null : getAvailableSortOptions().status[+val - 1] });
                  }
              } }
            />
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <div block="MyAccountMyOrders">
                <Loader isLoading={ isLoading } />
                { this.renderSortByOrderStatus() }
                { this.renderSortByCustomerName() }
                { this.renderOrdersPerPage() }
                { this.renderTable() }
                { this.renderPagination() }
                { this.renderOrdersPerPage() }
            </div>
        );
    }
}

export default MyAccountMyOrdersComponent;
