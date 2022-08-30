import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps as sourceMapStateToProps,
    MyAccountMyOrdersContainer as SourceMyAccountMyOrdersContainer
} from 'SourceComponent/MyAccountMyOrders/MyAccountMyOrders.container';

/** @namespace Scandipwa/Component/MyAccountMyOrders/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state)
    // TODO extend mapStateToProps
});

/** @namespace Scandipwa/Component/MyAccountMyOrders/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch)
    // TODO extend mapDispatchToProps
});

/** @namespace Scandipwa/Component/MyAccountMyOrders/Container */
export class MyAccountMyOrdersContainer extends SourceMyAccountMyOrdersContainer {
    // TODO implement logic
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyAccountMyOrdersContainer));
