/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';

export const NewArrival = PropTypes.shape({
    qty: PropTypes.number,
    date: PropTypes.string
});

export const StockType = PropTypes.shape({
    id: PropTypes.number,
    sku: PropTypes.string,
    warehouse: PropTypes.string,
    qty: PropTypes.number,
    newArrivals: PropTypes.arrayOf(NewArrival)
});
