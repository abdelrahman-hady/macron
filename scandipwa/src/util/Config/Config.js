/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

/** @namespace Scandipwa/Util/Config/getListViewAllowedOptions */
export const getListViewAllowedOptions = (list, defaultValue) => {
    const ordersPerPageOptions = [];

    if (list) {
        list.split(',').forEach((value) => {
            const perPage = +value;
            ordersPerPageOptions.push({ id: perPage, label: perPage, value: perPage });
        });
    } else {
        ordersPerPageOptions.push({ label: defaultValue, value: defaultValue });
    }

    return ordersPerPageOptions;
};
