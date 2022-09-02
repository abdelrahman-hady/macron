/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

export * from 'SourceStore/Order/Order.action.js';

export const GET_ORDERS_CONFIG = 'GET_ORDERS_CONFIG';

/** @namespace Scandipwa/Store/Order/Action/getOrdersConfig */
export const getOrdersConfig = (ordersConfig, status) => ({
    type: GET_ORDERS_CONFIG,
    ordersConfig,
    status
});
