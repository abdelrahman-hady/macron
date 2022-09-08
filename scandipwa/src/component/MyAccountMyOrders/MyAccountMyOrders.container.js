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

import { ORDERS_PER_PAGE, ORDERS_PER_PAGE_ITEM } from './MyAccountMyOrders.config';

export const OrderDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Order/Order.dispatcher'
);

/** @namespace Scandipwa/Component/MyAccountMyOrders/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state),
    ordersPerPageList: state.ConfigReducer.xperpage
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
        ordersPerPage: +BrowserDatabase.getItem(ORDERS_PER_PAGE_ITEM) ?? ORDERS_PER_PAGE,
        sortOptions: {
            status: null,
            user_customer_name: null
        }
    };

    containerFunctions = {
        onOrderPerPageChange: this.onOrderPerPageChange.bind(this),
        updateOptions: this.updateOptions.bind(this),
        getAvailableSortOptions: this.getAvailableSortOptions.bind(this),
        formatToFieldOptions: this.formatToFieldOptions.bind(this)
    };

    containerProps() {
        const { ordersPerPageList } = this.props;
        const { ordersPerPage, sortOptions } = this.state;

        return {
            ...super.containerProps(), ordersPerPageList, ordersPerPage, sortOptions
        };
    }

    componentDidMount() {
        const { getOrderList } = this.props;
        // eslint-disable-next-line no-unused-vars
        const { ordersPerPage, sortOptions } = this.state;
        // TODO : Pass Sort Options To this
        getOrderList(this._getPageFromUrl(), ordersPerPage);
    }

    getAvailableSortOptions() {
        const { orderList: { items = [] } } = this.props;

        const uniqueLists = {
            status: {},
            user_customer_name: {}
        };

        // list available options
        items.forEach((order) => {
            // add to a hash map to avoid duplicates
            const { status, user_customer_name } = order;
            if (status) {
                uniqueLists.status[status] = 1;
            }
            if (user_customer_name) {
                uniqueLists.user_customer_name[user_customer_name] = 1;
            }
        });

        return {
            status: Object.keys(uniqueLists.status),
            user_customer_name: Object.keys(uniqueLists.user_customer_name)
        };
    }

    formatToFieldOptions(options) {
        return options.map((option, idx) => ({
            id: idx + 1,
            label: __(option),
            value: idx + 1
        }));
    }

    componentDidUpdate(prevProps, prevState) {
        const { getOrderList } = this.props;
        const { location: prevLocation } = prevProps;
        const { ordersPerPage, sortOptions } = this.state;
        const {
            ordersPerPage: prevOrdersPerPage,
            sortOptions: prevSortOptions
        } = prevState;

        const prevPage = this._getPageFromUrl(prevLocation);
        const currentPage = this._getPageFromUrl();

        const sortOptionsChanged = () => !(JSON.stringify(sortOptions) === JSON.stringify(prevSortOptions));
        if (currentPage !== prevPage || ordersPerPage !== prevOrdersPerPage || sortOptionsChanged()) {
            getOrderList(this._getPageFromUrl(), ordersPerPage);
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

    render() {
        return (
            <MyAccountMyOrders
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyAccountMyOrdersContainer));
