/*
 * @category  Macron
 * @author    Opeyemi Ilesanmi <opeyemi.ilesanmi@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';

export const ShipmentType = PropTypes.shape({
    entity_id: PropTypes.number,
    shipment_number: PropTypes.string,
    status: PropTypes.string,
    tracking_number: PropTypes.string,
    date: PropTypes.string,
    customer_name: PropTypes.string,
    address: PropTypes.string
});
