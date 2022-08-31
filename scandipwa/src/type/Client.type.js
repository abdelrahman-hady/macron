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
