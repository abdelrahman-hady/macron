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
import { getListViewAllowedOptions } from 'Util/Config';

import './MyAccountMyOrders.override.style';

/** @namespace Scandipwa/Component/MyAccountMyOrders/Component */
export class MyAccountMyOrdersComponent extends SourceMyAccountMyOrders {
    static propTypes = {
        ...super.propTypes,
        ordersPerPageList: PropTypes.string.isRequired,
        ordersPerPage: PropTypes.number.isRequired,
        sortOptions: PropTypes.object.isRequired,
        statusOptions: PropTypes.array.isRequired,
        updateOptions: PropTypes.func.isRequired
    };

    renderToolbar() {
        return (
            <div className="MyAccountMyOrders-Toolbar">
                { this.renderSortByStatus() }
            </div>
        );
    }

    renderSortByStatus() {
        const { sortOptions: { orderStatus }, updateOptions, statusOptions } = this.props;
        return (
            <Field
              type={ FIELD_TYPE.select }
              label={ __('Sort by status') }
              mix={ { block: 'MyAccountMyOrders', elem: 'SortByStatus' } }
              options={ statusOptions }
              value={ orderStatus }
              events={ {
                  onChange: (val) => {
                      updateOptions({ orderStatus: val });
                  }
              } }
            />
        );
    }

    renderOrderRows() {
        const {
            orderList: { items = [] }, isLoading, sortOptions: { orderStatus }, statusOptions
        } = this.props;

        if (!isLoading && !items.length) {
            return this.renderNoOrders();
        }
        if (+orderStatus === 0) {
            // no filters selected -> render all orders
            return items.reduceRight(
                (acc, order) => [...acc, this.renderOrderRow(order)],
                []
            );
        }

        // Filter Orders By Status
        const [filterOption = {}] = statusOptions.filter((option) => option.id === orderStatus);
        return items.reduceRight(
            (acc, order) => {
                if (filterOption.label?.value === order.status) {
                    return [...acc, this.renderOrderRow(order)];
                }

                return Array.from(acc);
            },
            []
        );
    }

    renderPerPageDropdown() {
        const { ordersPerPageList, ordersPerPage, onOrderPerPageChange } = this.props;

        const ordersPerPageOptions = getListViewAllowedOptions(ordersPerPageList, ordersPerPage);

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

    render() {
        const { isLoading } = this.props;

        return (
            <div block="MyAccountMyOrders">
                <Loader isLoading={ isLoading } />
                { this.renderPerPageDropdown() }
                { this.renderToolbar() }
                { this.renderTable() }
                { this.renderPagination() }
                { this.renderPerPageDropdown() }
            </div>
        );
    }
}

export default MyAccountMyOrdersComponent;
