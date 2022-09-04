/*
 * @category  Macron
 * @author    Mohammed Komsany <mohammed.komsany@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
    mapDispatchToProps,
    mapStateToProps,
    MyAccountMyOrdersContainer as SourceMyAccountMyOrdersContainer
} from 'SourceComponent/MyAccountMyOrders/MyAccountMyOrders.container';
import { scrollToTop } from 'Util/Browser';

import MyAccountMyOrders from './MyAccountMyOrders.component';

/** @namespace Scandipwa/Component/MyAccountMyOrders/Container */
export class MyAccountMyOrdersContainer extends SourceMyAccountMyOrdersContainer {
    state = {
        ...this.state,
        sortOptions: {
            orderStatus: 0 // Filters orders list by status
        },
        statusOptions: []
    };

    containerFunctions = {
        ...this.containerFunctions,
        updateOptions: this.updateOptions.bind(this)
    };

    componentDidMount() {
        super.componentDidMount();
        this.setState({ statusOptions: this._getStatusOptions() });
    }

    componentDidUpdate(prevProps, prevState) {
        super.componentDidUpdate(prevProps, prevState);

        const { getOrderList } = this.props;
        const { sortOptions: { orderStatus } } = this.state;
        const { sortOptions: { orderStatus: prevOrderStatus } } = prevState;

        if (orderStatus !== prevOrderStatus) {
            getOrderList(this._getPageFromUrl());
            scrollToTop();
        }
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

    containerProps() {
        const { sortOptions, statusOptions } = this.state;
        return {
            ...super.containerProps(),
            sortOptions,
            statusOptions
        };
    }

    updateOptions(option) {
        this.setState(({ sortOptions }) => ({ sortOptions: { ...sortOptions, ...option } }));
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
