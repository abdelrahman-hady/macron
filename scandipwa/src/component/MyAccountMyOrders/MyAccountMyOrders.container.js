/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @author    Mohammed Komsany <mohammed.komsany@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import MyAccountMyOrders from 'Component/MyAccountMyOrders/MyAccountMyOrders.component';
import {
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps as sourceMapStateToProps,
    MyAccountMyOrdersContainer as SourceMyAccountMyOrdersContainer
} from 'SourceComponent/MyAccountMyOrders/MyAccountMyOrders.container';
import { scrollToTop } from 'Util/Browser';
import BrowserDatabase from 'Util/BrowserDatabase';
import { transformListViewAllowedValues } from 'Util/Config';

import { ORDERS_PER_PAGE, ORDERS_PER_PAGE_ITEM } from './MyAccountMyOrders.config';

export const OrderDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Order/Order.dispatcher'
);

/** @namespace Scandipwa/Component/MyAccountMyOrders/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state),
    ordersPerPageList: transformListViewAllowedValues(state.ConfigReducer.xperpage)
});

/** @namespace Scandipwa/Component/MyAccountMyOrders/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch),
    getOrderList: (page, pageSize) => OrderDispatcher.then(
        ({ default: dispatcher }) => dispatcher.requestOrders(dispatch, page, pageSize)
    )
});
/** @namespace Scandipwa/Component/MyAccountMyOrders/Container */
export class MyAccountMyOrdersContainer extends SourceMyAccountMyOrdersContainer {
    static propTypes = {
        ...super.propTypes,
        ordersPerPageList: PropTypes.string.isRequired
    };

    state = {
        ordersPerPage: +(BrowserDatabase.getItem(ORDERS_PER_PAGE_ITEM) ?? ORDERS_PER_PAGE),
        sortOptions: {
            orderStatus: 0 // Filters orders list by status
        },
        statusOptions: [],
        searchInput: '',
        orderListSearchResult: []
    };

    containerFunctions = {
        updateOptions: this.updateOptions.bind(this),
        onOrderPerPageChange: this.onOrderPerPageChange.bind(this)
    };

    containerProps() {
        const { ordersPerPageList } = this.props;
        const { ordersPerPage, sortOptions, statusOptions } = this.state;

        return {
            ...super.containerProps(), ordersPerPageList, ordersPerPage, sortOptions, statusOptions
        };
    }

    componentDidMount() {
        const { getOrderList } = this.props;
        const { ordersPerPage } = this.state;

        getOrderList(this._getPageFromUrl(), ordersPerPage);
        this.setState({ statusOptions: this._getStatusOptions() });
    }

    componentDidUpdate(prevProps, prevState) {
        const { getOrderList, ordersPerPageList } = this.props;
        const { sortOptions: { orderStatus }, ordersPerPage } = this.state;
        const { sortOptions: { orderStatus: prevOrderStatus }, ordersPerPage: prevOrdersPerPage } = prevState;
        const { location: prevLocation } = prevProps;

        const prevPage = this._getPageFromUrl(prevLocation);
        const currentPage = this._getPageFromUrl();

        if (ordersPerPageList.length > 0 && !ordersPerPageList.includes(ordersPerPage)) {
            this.setState({ ordersPerPage: ordersPerPageList[0] });
            return;
        }

        if (orderStatus !== prevOrderStatus || currentPage !== prevPage || ordersPerPage !== prevOrdersPerPage) {
            getOrderList(currentPage, ordersPerPage);
            scrollToTop();
        }
    }

    updateOptions(option) {
        this.setState(({ sortOptions }) => ({ sortOptions: { ...sortOptions, ...option } }));
    }

    onOrderPerPageChange(ordersPerPage) {
        BrowserDatabase.setItem(ordersPerPage, ORDERS_PER_PAGE_ITEM);

        this.setState({ ordersPerPage });
    }

    _getStatusOptions() {
    // Get Available Order Statuses Here
        const { orderList: { items = [] } } = this.props;
        const uniqueList = {};
        if (items) {
        // list available status
            items.forEach((order) => {
            // add to a hash map to avoid duplicates
                uniqueList[order.status] = 1;
            });

            // correctly format statusList so it can be passed to Field
            const statusArr = Array.from(Object.keys(uniqueList));
            const statusOptions = statusArr.map((option, idx) => ({
                id: idx + 1,
                label: __(option),
                value: idx + 1
            }));

            return statusOptions;
        }

        return [];
    }

    render() {
        return (
            <MyAccountMyOrders
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyAccountMyOrdersContainer));
