/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

/** @namespace Scandipwa/Util/Config/getListViewAllowedOptions */
export const getListViewAllowedOptions = (list, defaultValue) => {
    const perPageOptions = [];

    if (list.length > 0) {
        list.forEach((value) => {
            const perPage = +value;
            perPageOptions.push({ id: perPage, label: perPage, value: perPage });
        });
    } else {
        perPageOptions.push({ label: defaultValue, value: defaultValue });
    }

    return perPageOptions;
};

/** @namespace Scandipwa/Util/Config/transformListViewAllowedValues */
export const transformListViewAllowedValues = (list) => {
    if (!list) {
        return [];
    }

    const transformedList = list.split(',').map((val) => Number(val));

    return Array.from(new Set(transformedList));
};
