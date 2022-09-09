/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

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
    ordersPerPageList: state.ConfigReducer.xperpage,
    device: state.ConfigReducer.device
});

/** @namespace Scandipwa/Component/MyAccountMyOrders/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch),
    getOrderList: (page, pageSize) => OrderDispatcher.then(
        ({ default: dispatcher }) => dispatcher.requestOrders(dispatch, page, pageSize)
    ),
    setLoadingStatus: (status) => dispatch(setLoadingStatus(status))
});

/** @namespace Scandipwa/Component/MyAccountMyOrders/Container */
export class MyAccountMyOrdersContainer extends SourceMyAccountMyOrdersContainer {
    static propTypes = {
        ...super.propTypes,
        ordersPerPageList: PropTypes.string.isRequired,
        device: DeviceType.isRequired,
        setLoadingStatus: PropTypes.func.isRequired
    };

    timer = null;

    state = {
        ordersPerPage: +BrowserDatabase.getItem(ORDERS_PER_PAGE_ITEM) ?? ORDERS_PER_PAGE,
        dateFrom: '',
        dateTo: '',
        searchInput: '',
        orderListSearchResult: []
    };

    containerFunctions = {
        onOrderPerPageChange: this.onOrderPerPageChange.bind(this),
        onDateFromSelectorChange: this.onDateFromSelectorChange.bind(this),
        onDateToSelectorChange: this.onDateToSelectorChange.bind(this),
        onInputChange: this.onInputChange.bind(this)
    };

    containerProps() {
        const { ordersPerPageList, device } = this.props;
        const {
            ordersPerPage, dateFrom, dateTo, searchInput, orderListSearchResult
        } = this.state;

        return {
            ...super.containerProps(),
            ordersPerPageList,
            ordersPerPage,
            dateFrom,
            dateTo,
            device,
            searchInput,
            orderListSearchResult
        };
    }

    componentDidMount() {
        const { getOrderList } = this.props;
        const { ordersPerPage } = this.state;

        getOrderList(this._getPageFromUrl(), ordersPerPage);
    }

    componentDidUpdate(prevProps, prevState) {
        const { getOrderList } = this.props;
        const { location: prevLocation } = prevProps;
        const { ordersPerPage, dateFrom, dateTo } = this.state;
        const { ordersPerPage: prevOrdersPerPage } = prevState;
        const { dateFrom: prevDateFrom } = prevState;
        const { dateTo: prevDateTo } = prevState;

        const prevPage = this._getPageFromUrl(prevLocation);
        const currentPage = this._getPageFromUrl();

        if (currentPage !== prevPage || ordersPerPage !== prevOrdersPerPage
            || dateFrom !== prevDateFrom || dateTo !== prevDateTo) {
            getOrderList(this._getPageFromUrl(), ordersPerPage);
            scrollToTop();
        }
    }

    onOrderPerPageChange(ordersPerPage) {
        BrowserDatabase.setItem(ordersPerPage, ORDERS_PER_PAGE_ITEM);

        this.setState({ ordersPerPage });
    }

    onDateFromSelectorChange(e) {
        this.setState({ dateFrom: e.target.value });
    }

    onDateToSelectorChange(e) {
        this.setState({ dateTo: e.target.value });
    }

    onInputChange(e) {
        const { setLoadingStatus } = this.props;
        const { value } = e.target;
        this.setState({ searchInput: value });
        const query = OrderQuery.getOrdersByKeywordQuery(value);
        this.debounce(
            () => {
                setLoadingStatus(true);
                try {
                    fetchQuery(query).then(
                    /** @namespace Scandipwa/Component/MyAccountMyOrders/Container/MyAccountMyOrdersContainer/onInputChange/debounce/fetchQuery/then */
                        ({ OrdersByKeyword }) => {
                            setLoadingStatus(false);
                            this.setState({ orderListSearchResult: formatOrders(OrdersByKeyword) });
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
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyAccountMyOrdersContainer));
