/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';

import Loader from 'Component/Loader';
import SearchIcon from 'Component/SearchIcon';
import Field from 'SourceComponent/Field';
import FIELD_TYPE from 'SourceComponent/Field/Field.config';
import {
    MyAccountMyOrders as SourceMyAccountMyOrders
} from 'SourceComponent/MyAccountMyOrders/MyAccountMyOrders.component';

import './MyAccountMyOrders.override.style.scss';

/** @namespace Scandipwa/Component/MyAccountMyOrders/Component */
export class MyAccountMyOrdersComponent extends SourceMyAccountMyOrders {
    static propTypes = {
        ...super.propTypes,
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
                { this.renderSearchBar() }
                { this.renderTable() }
                { this.renderPagination() }
            </div>
        );
    }
}

export default MyAccountMyOrdersComponent;
