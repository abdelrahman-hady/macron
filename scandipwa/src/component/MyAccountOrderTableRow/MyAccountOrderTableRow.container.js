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

import { ACCOUNT_ORDER_URL } from 'Route/MyAccount/MyAccount.config';
import {
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps as sourceMapStateToProps,
    MyAccountOrderTableRowContainer as SourceMyAccountOrderTableRowContainer
} from 'SourceComponent/MyAccountOrderTableRow/MyAccountOrderTableRow.container';
import history from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

/** @namespace Scandipwa/Component/MyAccountOrderTableRow/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch)
});

/** @namespace Scandipwa/Component/MyAccountOrderTableRow/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state)
});

/** @namespace Scandipwa/Component/MyAccountOrderTableRow/Container */
export class MyAccountOrderTableRowContainer extends SourceMyAccountOrderTableRowContainer {
    onViewClick() {
        const { order: { id, sap_order_id } } = this.props;
        const orderId = sap_order_id != null ? sap_order_id : id;

        history.push({ pathname: appendWithStoreCode(`${ACCOUNT_ORDER_URL}/${orderId}`) });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountOrderTableRowContainer);
