/* eslint-disable react/forbid-prop-types */
/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @author    Mohammed Komsany <mohammed.komsany@scandiweb.com | info@scandiweb.com>
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
import { getListViewAllowedOptions } from 'Util/Config';

import './MyAccountMyOrders.override.style';

/** @namespace Scandipwa/Component/MyAccountMyOrders/Component */
export class MyAccountMyOrdersComponent extends SourceMyAccountMyOrders {
    static propTypes = {
        ...super.propTypes,
        ordersPerPageList: PropTypes.arrayOf(PropTypes.number).isRequired,
        ordersPerPage: PropTypes.number.isRequired,
        sortOptions: PropTypes.object.isRequired,
        statusOptions: PropTypes.array.isRequired,
        updateOptions: PropTypes.func.isRequired,
        onInputChange: PropTypes.func.isRequired,
        searchInput: PropTypes.string.isRequired,
        orderListSearchResult: PropTypes.arrayOf.isRequired
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

    renderOrderRows() {
        const {
            orderList: { items = [] },
            isLoading,
            sortOptions: { orderStatus },
            statusOptions,
            searchInput,
            orderListSearchResult
        } = this.props;

        if (!isLoading && !items.length && !orderListSearchResult.length) {
            return this.renderNoOrders();
        }

        const ordersItems = searchInput !== '' ? orderListSearchResult : items;

        if (orderStatus === 0) {
            // no filters selected -> render all orders
            return ordersItems.reduceRight(
                (acc, order) => [...acc, this.renderOrderRow(order)],
                []
            );
        }

        // Filter Orders By Status
        const [filterOption = {}] = statusOptions.filter((option) => option.id === orderStatus);
        return ordersItems.reduceRight(
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

    renderPagination() {
        const { isLoading, orderList: { pageInfo = { total_pages: 1 } } } = this.props;
        const { total_pages } = pageInfo;

        return (
             <Pagination totalPages={ total_pages } isLoading={ isLoading } />
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <div block="MyAccountMyOrders">
                <Loader isLoading={ isLoading } />
                { this.renderSearchBar() }
                { this.renderPerPageDropdown() }
                { this.renderTable() }
                { this.renderPagination() }
                { this.renderPerPageDropdown() }
            </div>
        );
    }
}

export default MyAccountMyOrdersComponent;
