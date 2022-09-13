/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';

export const ClientType = PropTypes.shape({
    entity_id: PropTypes.number,
    company_name: PropTypes.string,
    address: PropTypes.string,
    vat_number: PropTypes.number,
    date_id: PropTypes.number,
    date: PropTypes.string,
    affiliation_id: PropTypes.number,
    affiliation: PropTypes.string,
    sport_id: PropTypes.number,
    sport: PropTypes.string,
    category: PropTypes.string,
    primary_color_id: PropTypes.number,
    primary_color: PropTypes.string,
    secondary_color_id: PropTypes.number,
    secondary_color: PropTypes.string,
    current_brand_id: PropTypes.number,
    current_brand: PropTypes.string,
    coni_id: PropTypes.number,
    membership_no: PropTypes.number,
    distance_id: PropTypes.number,
    distance: PropTypes.string,
    contact_person: PropTypes.string,
    mobile: PropTypes.string,
    email: PropTypes.string,
    is_contract_signed: PropTypes.bool
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
