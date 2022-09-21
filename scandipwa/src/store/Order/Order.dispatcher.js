/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { ORDERS_PER_PAGE } from 'Component/MyAccountMyOrders/MyAccountMyOrders.config';
import OrderQuery from 'Query/Order.query';
import {
    OrderDispatcher as SourceOrderDispatcher
} from 'SourceStore/Order/Order.dispatcher';
import { showNotification } from 'Store/Notification/Notification.action';
import { getOrderList, setLoadingStatus } from 'Store/Order/Order.action';
import { fetchQuery, getErrorMessage } from 'Util/Request';

/** @namespace Scandipwa/Store/Order/Dispatcher */
export class OrderDispatcher extends SourceOrderDispatcher {
    requestOrders(dispatch, page = 1, pageSize = ORDERS_PER_PAGE, filterOptions) {
        const query = OrderQuery.getOrderListQuery({ page, pageSize, filterOptions });
        dispatch(setLoadingStatus(true));

        return fetchQuery(query).then(
            /** @namespace Scandipwa/Store/Order/Dispatcher/OrderDispatcher/requestOrders/fetchQuery/then */
            ({ customer: { orders } }) => {
                dispatch(getOrderList(orders, false));
            },
            /** @namespace Scandipwa/Store/Order/Dispatcher/OrderDispatcher/requestOrders/fetchQuery/then/catch */
            (error) => {
                dispatch(showNotification('error', getErrorMessage(error)));
                dispatch(setLoadingStatus(false));
            }
        );
    }

    async getOrderById(dispatch, orderId, isSapOrderId) {
        try {
            const {
                customer: {
                    orders: {
                        items
                    }
                }
            } = await fetchQuery(OrderQuery.getOrderListQuery({ orderId, isSapOrderId }));

            return items[0];
        } catch (error) {
            dispatch(showNotification('error', getErrorMessage(error)));

            return null;
        }
    }
}

export default new OrderDispatcher();
