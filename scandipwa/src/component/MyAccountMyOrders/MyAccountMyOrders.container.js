/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import OrderQuery from 'Query/Order.query';
import {
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps as sourceMapStateToProps,
    MyAccountMyOrdersContainer as SourceMyAccountMyOrdersContainer
} from 'SourceComponent/MyAccountMyOrders/MyAccountMyOrders.container';
import { setLoadingStatus } from 'Store/Order/Order.action';
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
    ...sourceMapDispatchToProps(dispatch),
    setLoadingStatus: (status) => dispatch(setLoadingStatus(status))
});

/** @namespace Scandipwa/Component/MyAccountMyOrders/Container */
export class MyAccountMyOrdersContainer extends SourceMyAccountMyOrdersContainer {
    static propTypes = {
        ...super.propTypes,
        device: DeviceType.isRequired,
        setLoadingStatus: PropTypes.func.isRequired
    };

    state = {
        searchInput: '',
        orderListSearchResult: []
    };

    timer = null;

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
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyAccountMyOrdersContainer));
