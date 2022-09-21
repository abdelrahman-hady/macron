/*
 * @category  Macron
 * @author    Saad Amir <saad.amir@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { OrdersListType } from 'Type/Order.type';
import history from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

import DashboardOrdersTableComponent from './DashboardOrdersTable.component';

export const OrderDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Order/Order.dispatcher'
);

/** @namespace Scandipwa/Component/DashboardOrdersTable/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    orderList: state.OrderReducer.orderList,
    isLoading: state.OrderReducer.isLoading
});

/** @namespace Scandipwa/Component/DashboardOrdersTable/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    getOrderList: (page, pageSize, filterOptions) => OrderDispatcher.then(
        ({ default: dispatcher }) => dispatcher.requestOrders(dispatch, page, pageSize, filterOptions)
    )
});

/** @namespace Scandipwa/Component/DashboardOrdersTable/Container */
export class DashboardOrdersTableContainer extends PureComponent {
    static propTypes = {
        getOrderList: PropTypes.func.isRequired,
        orderList: OrdersListType.isRequired,
        isLoading: PropTypes.bool.isRequired
    };

    state={
        filterOptions: {
            status: null,
            user_customer_name: null,
            dateFrom: '',
            dateTo: ''
        },
        page: 1,
        compactLength: 5
    };

    containerFunctions={
        onViewAllButtonClick: this.onViewAllButtonClick.bind(this)
    };

    componentDidMount() {
        const { getOrderList } = this.props;
        const { filterOptions, compactLength, page } = this.state;
        getOrderList(page, compactLength, filterOptions);
    }

    containerProps() {
        const { orderList, isLoading } = this.props;
        const { filterOptions, compactLength } = this.state;
        return {
            orderList, isLoading, filterOptions, compactLength
        };
    }

    onViewAllButtonClick() {
        history.push({ pathname: appendWithStoreCode('sales/order/history') });
    }

    render() {
        return (
             <DashboardOrdersTableComponent
               { ...this.containerProps() }
               { ...this.containerFunctions }
             />
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardOrdersTableContainer));
