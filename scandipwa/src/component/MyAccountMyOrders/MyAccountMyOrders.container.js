/* eslint-disable max-lines */
/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @author    Mohammed Komsany <mohammed.komsany@scandiweb.com | info@scandiweb.com>
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { appendWithStoreCode } from '@scandipwa/scandipwa/src/util/Url';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import MyAccountMyOrders from 'Component/MyAccountMyOrders/MyAccountMyOrders.component';
import OrderQuery from 'Query/Order.query';
import {
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps as sourceMapStateToProps,
    MyAccountMyOrdersContainer as SourceMyAccountMyOrdersContainer
} from 'SourceComponent/MyAccountMyOrders/MyAccountMyOrders.container';
import { setLoadingStatus } from 'Store/Order/Order.action';
import { DeviceType } from 'Type/Device.type';
import { scrollToTop } from 'Util/Browser';
import BrowserDatabase from 'Util/BrowserDatabase';
import { transformListViewAllowedValues } from 'Util/Config';
import history from 'Util/History';
import { formatOrders } from 'Util/Orders';
import { fetchQuery } from 'Util/Request';

import { ORDERS_PER_PAGE, ORDERS_PER_PAGE_ITEM } from './MyAccountMyOrders.config';

export const OrderDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Order/Order.dispatcher'
);

/** @namespace Scandipwa/Component/MyAccountMyOrders/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state),
    ordersPerPageList: transformListViewAllowedValues(state.ConfigReducer.xperpage),
    device: state.ConfigReducer.device
});

/** @namespace Scandipwa/Component/MyAccountMyOrders/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch),
    getOrderList: (page, pageSize, filterOptions) => OrderDispatcher.then(
        ({ default: dispatcher }) => dispatcher.requestOrders(dispatch, page, pageSize, filterOptions)
    ),
    setLoadingStatus: (status) => dispatch(setLoadingStatus(status))
});

/** @namespace Scandipwa/Component/MyAccountMyOrders/Container */
export class MyAccountMyOrdersContainer extends SourceMyAccountMyOrdersContainer {
    static propTypes = {
        ...super.propTypes,
        ordersPerPageList: PropTypes.string.isRequired,
        getOrderList: PropTypes.func.isRequired,
        setLoadingStatus: PropTypes.func.isRequired,
        device: DeviceType.isRequired
    };

    timer = null;

    state = {
        ordersPerPage: +(BrowserDatabase.getItem(ORDERS_PER_PAGE_ITEM) ?? ORDERS_PER_PAGE),
        filterOptions: {
            dateFrom: '',
            dateTo: '',
            status: null,
            user_customer_name: null
        },
        availableFilters: {
            status: [],
            user_customer_name: []
        },
        searchInput: '',
        orderListSearchResult: []
    };

    containerFunctions = {
        updateOptions: this.updateOptions.bind(this),
        onOrderPerPageChange: this.onOrderPerPageChange.bind(this),
        onDateSelectorChange: this.onDateSelectorChange.bind(this),
        onInputChange: this.onInputChange.bind(this),
        formatToFieldOptions: this.formatToFieldOptions.bind(this)
    };

    containerProps() {
        const { ordersPerPageList, device } = this.props;
        const {
            ordersPerPage,
            searchInput,
            orderListSearchResult,
            dateFrom, dateTo,
            filterOptions,
            availableFilters
        } = this.state;

        return {
            device,
            searchInput,
            orderListSearchResult,
            ordersPerPageList,
            ordersPerPage,
            dateFrom,
            dateTo,
            filterOptions,
            availableFilters,
            ...super.containerProps()
        };
    }

    componentDidMount() {
        const { getOrderList } = this.props;
        const { ordersPerPage = ORDERS_PER_PAGE, filterOptions } = this.state;

        getOrderList(this._getPageFromUrl(), ordersPerPage, filterOptions).then(
            /** @namespace Scandipwa/Component/MyAccountMyOrders/Container/MyAccountMyOrdersContainer/componentDidMount/getOrderList/then */
            () => {
                // Get Available Filter Options on First Orders
                this.setState({ availableFilters: this.getAvailablefilterOptions() });
            }
        );
    }

    getAvailablefilterOptions() {
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
        const {
            getOrderList, ordersPerPageList, orderList: {
                pageInfo: {
                    total_pages = 0
                } = {}
            }
        } = this.props;
        const { ordersPerPage = ORDERS_PER_PAGE, filterOptions, availableFilters } = this.state;
        const {
            ordersPerPage: prevOrdersPerPage,
            filterOptions: prevFilterOptions,
            availableFilters: prevAvailableFilters
        } = prevState;
        const { location: prevLocation } = prevProps;

        const prevPage = this._getPageFromUrl(prevLocation);
        const currentPage = this._getPageFromUrl();

        if (currentPage !== 1 && total_pages > 0 && currentPage > total_pages) {
            const pageParam = total_pages > 1 ? `?page=${total_pages}` : '';
            history.replace(appendWithStoreCode(`/sales/order/history${pageParam}`));
        }

        if (ordersPerPageList.length > 0 && !ordersPerPageList.includes(ordersPerPage)) {
            if (ordersPerPageList.includes(ORDERS_PER_PAGE)) {
                this.setState({ ordersPerPage: ORDERS_PER_PAGE });
            } else {
                this.setState({ ordersPerPage: ordersPerPageList[0] });
            }

            return;
        }

        if (currentPage !== prevPage
            || ordersPerPage !== prevOrdersPerPage
            || filterOptions !== prevFilterOptions
            || availableFilters !== prevAvailableFilters
        ) {
            getOrderList(this._getPageFromUrl(), ordersPerPage, filterOptions).then(
                /** @namespace Scandipwa/Component/MyAccountMyOrders/Container/MyAccountMyOrdersContainer/componentDidUpdate/getOrderList/then */
                () => {
                    // Should update available filters when page number is changed
                    if (currentPage !== prevPage) {
                        this.setState({ availableFilters: this.getAvailablefilterOptions() });
                    }
                }
            );
            scrollToTop();
        }
    }

    updateOptions(option) {
        this.setState(({ filterOptions }) => ({ filterOptions: { ...filterOptions, ...option } }));
    }

    onOrderPerPageChange(ordersPerPage) {
        BrowserDatabase.setItem(ordersPerPage, ORDERS_PER_PAGE_ITEM);
        this.setState({ ordersPerPage });
    }

    onDateSelectorChange(e) {
        const { name, value } = e.target;
        const { filterOptions } = this.state;
        this.setState({ filterOptions: { ...filterOptions, [name]: value } });
    }

    onInputChange(e) {
        const { setLoadingStatus } = this.props;
        const { value } = e.target;
        const { ordersPerPage = ORDERS_PER_PAGE } = this.state;
        this.setState({ searchInput: value });
        const query = OrderQuery.getOrdersByKeywordQuery(this._getPageFromUrl(), ordersPerPage, value);
        this.debounce(
            () => {
                setLoadingStatus(true);
                try {
                    fetchQuery(query).then(
                    /** @namespace Scandipwa/Component/MyAccountMyOrders/Container/MyAccountMyOrdersContainer/onInputChange/debounce/fetchQuery/then */
                        ({ OrdersByKeyword }) => {
                            const { items = [], page_info } = OrdersByKeyword;
                            const formattedOrders = formatOrders(items);
                            setLoadingStatus(false);
                            this.setState({ orderListSearchResult: { items: formattedOrders, pageInfo: page_info } });
                        }
                    );
                } catch (error) {
                    setLoadingStatus(false);
                }
            }
        );
    }

    // eslint-disable-next-line no-magic-numbers
    debounce(func, timeout = 500) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            func();
        }, timeout);
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
