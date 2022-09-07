/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @category  Macron
 * @author    Juris Kucinskis <info@scandiweb.com>
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import { connect } from 'react-redux';

import { ACCOUNT_ORDER_HISTORY } from 'Route/MyAccount/MyAccount.config';
import {
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps as sourceMapStateToProps,
    MyAccountOrderContainer as SourceMyAccountOrderContainer
} from 'SourceComponent/MyAccountOrder/MyAccountOrder.container';
import { isSignedIn } from 'Util/Auth';
import history from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

/** @namespace Scandipwa/Component/MyAccountOrder/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state)
});

/** @namespace Scandipwa/Component/MyAccountOrder/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch)
});

/** @namespace Scandipwa/Component/MyAccountOrder/Container */
export class MyAccountOrderContainer extends SourceMyAccountOrderContainer {
    async requestOrderDetails() {
        const {
            match: {
                params: {
                    orderId
                }
            },
            getOrderById,
            changeTabName,
            setTabSubheading
        } = this.props;

        if (!isSignedIn()) {
            return;
        }

        const order = await getOrderById(orderId);

        if (!order) {
            history.replace(appendWithStoreCode(`${ ACCOUNT_ORDER_HISTORY }`));
            // To be replaced with not-found page when it will be created.

            return;
        }

        const { increment_id, status, id: uid } = order;

        // decode uid of order before setting into state
        order.id = atob(uid);

        changeTabName((__('Order # %s', increment_id)));
        setTabSubheading(status);
        this.handleChangeHeaderState();
        this.setState({ order, isLoading: false });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountOrderContainer);
