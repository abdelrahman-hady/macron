/*
 * @category  Macron
 * @author    Juris Kucinskis <juris.kucinskis@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { connect } from 'react-redux';

import { ACCOUNT_ORDER_URL } from 'Route/MyAccount/MyAccount.config';
import {
    mapDispatchToProps,
    mapStateToProps,
    MyAccountOrderTableRowContainer as SourceMyAccountOrderTableRowContainer
} from 'SourceComponent/MyAccountOrderTableRow/MyAccountOrderTableRow.container';
import history from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

/** @namespace Scandipwa/Component/MyAccountOrderTableRow/Container */
export class MyAccountOrderTableRowContainer extends SourceMyAccountOrderTableRowContainer {
    onViewClick() {
        const { order: { id, sap_order_id } } = this.props;
        const orderId = sap_order_id ?? id;

        history.push({ pathname: appendWithStoreCode(`${ACCOUNT_ORDER_URL}/${orderId}`) });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountOrderTableRowContainer);
