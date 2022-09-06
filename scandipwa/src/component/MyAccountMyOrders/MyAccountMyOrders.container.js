import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import MyAccountMyOrders from 'Component/MyAccountMyOrders';
import OrderQuery from 'Query/Order.query';
import {
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps as sourceMapStateToProps,
    MyAccountMyOrdersContainer as SourceMyAccountMyOrdersContainer
} from 'SourceComponent/MyAccountMyOrders/MyAccountMyOrders.container';
import { DeviceType } from 'Type/Device.type';
import { fetchQuery } from 'Util/Request';

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
            ({ OrdersByKeyword }) => this.setState({ orderListSearchResult: OrdersByKeyword })
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
