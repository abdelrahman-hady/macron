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

import OrderQuery from 'Query/Order.query';
import { OrderDispatcher as SourceOrdertDispatcher } from 'SourceStore/Order/Order.dispatcher';
import { showNotification } from 'Store/Notification/Notification.action';
import { fetchQuery, getErrorMessage } from 'Util/Request';

/** @namespace Scandipwa/Store/Order/Dispatcher */
export class OrderDispatcher extends SourceOrdertDispatcher {
    async getOrderById(dispatch, orderId) {
        try {
            const {
                customer: {
                    orders: {
                        items
                    }
                }
            } = await fetchQuery(OrderQuery.getOrderListQuery({ orderId }));

            return items[0];
        } catch (error) {
            dispatch(showNotification('error', getErrorMessage(error)));

            return null;
        }
    }
}

export default new OrderDispatcher();
