/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import OrderQuery from 'Query/Order.query';
import {
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps as sourceMapStateToProps,
    MyAccountMyOrdersContainer as SourceMyAccountMyOrdersContainer
} from 'SourceComponent/MyAccountMyOrders/MyAccountMyOrders.container';
import { DeviceType } from 'Type/Device.type';
import { formatOrders } from 'Util/Orders';
import { fetchQuery } from 'Util/Request';

import MyAccountMyOrders from './MyAccountMyOrders.component';

/** @namespace Scandipwa/Component/MyAccountMyOrders/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state),
    device: state.ConfigReducer.device
});

/** @namespace Scandipwa/Component/MyAccountMyOrders/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch)
});

/** @namespace Scandipwa/Component/MyAccountMyOrders/Container */
export class MyAccountMyOrdersContainer extends SourceMyAccountMyOrdersContainer {
    static propTypes = {
        ...super.propTypes,
        device: DeviceType.isRequired
    };

    state = {
        searchInput: '',
        orderListSearchResult: []
    };

    containerProps() {
        const {
            device
        } = this.props;

        const { searchInput, orderListSearchResult } = this.state;

        return {
            device,
            searchInput,
            orderListSearchResult,
            ...super.containerProps()
        };
    }

    containerFunctions = {
        onInputChange: this.onInputChange.bind(this)
    };

    onInputChange(e) {
        const { value } = e.target;
        this.setState({ searchInput: value });
        const query = OrderQuery.getOrdersByKeywordQuery(value);
        fetchQuery(query).then(
            /** @namespace Scandipwa/Component/MyAccountMyOrders/Container/MyAccountMyOrdersContainer/onInputChange/fetchQuery/then */
            ({ OrdersByKeyword }) => {
                this.setState({ orderListSearchResult: formatOrders(OrdersByKeyword) });
            }
        );
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
