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
import Pagination from 'Component/Pagination';
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
        onDateSelectorChange: PropTypes.func.isRequired,
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
            onDateSelectorChange,
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
                          id: 'dateFrom',
                          name: 'dateFrom',
                          value: dateFrom
                      } }
                      events={ {
                          onChange: onDateSelectorChange
                      } }
                    />
                </div>
                <div block="MyAccountMyOrders" elem="DateFilter">
                    <p>{ __('Data to:') }</p>
                    <Field
                      type={ FIELD_TYPE.date }
                      attr={ {
                          id: 'dateTo',
                          name: 'dateTo',
                          value: dateTo
                      } }
                      events={ {
                          onChange: onDateSelectorChange
                      } }
                    />
                </div>
            </div>
        );
    }

    renderOrderRows() {
        const {
            orderList: { items = [] }, isLoading,
            orderListSearchResult: { items: searchedItems = [] },
            searchInput
        } = this.props;

        const orderItems = searchInput !== '' ? searchedItems : items;
        if (!isLoading && !orderItems.length) {
            return this.renderNoOrders();
        }

        const orders = orderItems.length
            ? orderItems
            : Array.from({ length: 10 }, (_, id) => ({ base_order_info: { id } }));

        return orders.reduceRight(
            (acc, e) => [...acc, this.renderOrderRow(e)],
            []
        );
    }

    renderPagination() {
        const {
            isLoading,
            orderList: {
                pageInfo: {
                    total_pages = 0
                } = {}
            },
            orderListSearchResult: {
                pageInfo: {
                    total_pages_searched = 0
                } = {}
            },
            searchInput
        } = this.props;

        const pages = searchInput !== '' ? total_pages_searched : total_pages;

        return (
            <Pagination
              isLoading={ isLoading }
              totalPages={ pages }
              mix={ { block: 'MyAccountMyOrders', elem: 'Pagination' } }
            />
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
