/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';

export const ClientType = PropTypes.shape({
    entity_id: PropTypes.number,
    address: PropTypes.string,
    affiliation: PropTypes.string,
    category: PropTypes.number,
    company_name: PropTypes.string,
    coni_id: PropTypes.number,
    contact_person: PropTypes.string,
    contract_expiracy_date: PropTypes.string,
    current_brand: PropTypes.string,
    distance: PropTypes.number,
    email: PropTypes.string,
    membership_no: PropTypes.number,
    mobile: PropTypes.string,
    primary_color: PropTypes.number,
    secondary_color: PropTypes.number,
    sport: PropTypes.number,
    vat_number: PropTypes.number
});

export const PageInfoType = PropTypes.shape({
    current_page: PropTypes.number,
    page_size: PropTypes.number,
    total_pages: PropTypes.number
});

export const ClientListType = PropTypes.shape({
    items: PropTypes.arrayOf(ClientType),
    page_info: PageInfoType
});
