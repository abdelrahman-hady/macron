/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
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
        ordersPerPage: +BrowserDatabase.getItem(ORDERS_PER_PAGE_ITEM) ?? ORDERS_PER_PAGE
    };

    containerFunctions = {
        onOrderPerPageChange: this.onOrderPerPageChange.bind(this)
    };

    containerProps() {
        const { ordersPerPageList } = this.props;
        const { ordersPerPage } = this.state;

        return { ...super.containerProps(), ordersPerPageList, ordersPerPage };
    }

    componentDidMount() {
        const { getOrderList } = this.props;
        const { ordersPerPage } = this.state;

        getOrderList(this._getPageFromUrl(), ordersPerPage);
    }

    componentDidUpdate(prevProps, prevState) {
        const { getOrderList } = this.props;
        const { location: prevLocation } = prevProps;
        const { ordersPerPage } = this.state;
        const { ordersPerPage: prevOrdersPerPage } = prevState;

        const prevPage = this._getPageFromUrl(prevLocation);
        const currentPage = this._getPageFromUrl();

        if (currentPage !== prevPage || ordersPerPage !== prevOrdersPerPage) {
            getOrderList(currentPage, ordersPerPage);
            scrollToTop();
        }
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
