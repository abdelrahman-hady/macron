/**
 * @category  Macron
 * @author    Abdelhakk Bakry <abdelhakk.bakry@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';

export const InvoiceType = PropTypes.shape({
    id: PropTypes.number,
    invoice_number: PropTypes.number,
    date: PropTypes.string,
    customer: PropTypes.string,
    address: PropTypes.string,
    total: PropTypes.number,
    status: PropTypes.string
});
