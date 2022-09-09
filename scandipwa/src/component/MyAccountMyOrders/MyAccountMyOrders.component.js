/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';

import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import Loader from 'Component/Loader';
import MyAccountOrderTableRow from 'Component/MyAccountOrderTableRow';
import SearchIcon from 'Component/SearchIcon';
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
        onInputChange: PropTypes.func.isRequired,
        searchInput: PropTypes.string.isRequired,
        orderListSearchResult: PropTypes.arrayOf.isRequired
    };

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    shouldComponentUpdate(nextProps) {
        const {
            device, orderList, isLoading, orderListSearchResult
        } = this.props;
        const {
            device: nextDevice,
            orderList: nextOrderList,
            isLoading: nextIsLoading,
            orderListSearchResult: nextOrderListSearchResult
        } = nextProps;

        return device !== nextDevice
        || orderList !== nextOrderList
        || isLoading !== nextIsLoading
        || orderListSearchResult !== nextOrderListSearchResult;
    }

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

    renderSearchBar() {
        const { onInputChange } = this.props;
        return (
            <div
              block="SearchOrder"
              elem="SearchInnerWrapper"
            >
                <div
                  block="SearchOrder"
                  elem="SearchIcon"
                >
                    <SearchIcon />
                </div>
                <Field
                  id="SearchOrder"
                  type={ FIELD_TYPE.text }
                  attr={ {
                      block: 'SearchOrder',
                      elem: 'SearchInput',
                      name: 'SearchOrder',
                      placeholder: __('Search by keyword')
                  } }
                  events={ {
                      onChange: onInputChange
                  } }
                />
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

    renderOrderRows() {
        const {
            orderList: { items = [] }, isLoading, searchInput, orderListSearchResult
        } = this.props;

        if (!isLoading && !items.length && !orderListSearchResult.length) {
            return this.renderNoOrders();
        }

        const ordersItems = searchInput !== '' ? orderListSearchResult : items;
        const orders = ordersItems.length
            ? ordersItems
            : Array.from({ length: 10 }, (_, id) => ({ base_order_info: { id } }));

        return orders.reduceRight(
            (acc, e) => [...acc, this.renderOrderRow(e)],
            []
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <div block="MyAccountMyOrders">
                <Loader isLoading={ isLoading } />
                { this.renderFilters() }
                { this.renderSearchBar() }
                { this.renderOrdersPerPage() }
                { this.renderTable() }
                { this.renderPagination() }
                { this.renderOrdersPerPage() }
            </div>
        );
    }
}

export default MyAccountMyOrdersComponent;
