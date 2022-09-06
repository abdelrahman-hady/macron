/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import FIELD_TYPE from 'Component/Field/Field.config';
import { VALIDATION_INPUT_TYPE } from 'Util/Validator/Config';

import { CONTACTS_FIELDS, DETAILS_FIELDS } from './CreateClientPage.config';

/** @namespace Scandipwa/Route/CreateClientPage/Form/createClientForm */
export const createClientForm = (props, _events = {}) => {
    const { selectItems } = props;

    const selectItemsOptions = [];
    selectItems.forEach((item) => {
        selectItemsOptions.push({ label: item, value: 1 });
    });

    return {
        [DETAILS_FIELDS]: {
            title: __('Client details'),
            fields: [
                {
                    type: FIELD_TYPE.text,
                    label: __('Company name'),
                    addRequiredTag: true,
                    attr: {
                        name: 'company_name'
                    },
                    validateOn: ['onChange'],
                    validationRule: {
                        isRequired: true
                    }
                },
                {
                    type: FIELD_TYPE.text,
                    label: __('Address'),
                    attr: {
                        name: 'address'
                    }
                },
                {
                    type: FIELD_TYPE.number,
                    label: __('VAT number'),
                    attr: {
                        name: 'vat_number'
                    }
                },
                {
                    type: FIELD_TYPE.date,
                    label: __('Contract expiracy date'),
                    attr: {
                        name: 'contract_expiracy_date'
                    },
                    validateOn: ['onChange'],
                    validationRule: {
                        inputType: VALIDATION_INPUT_TYPE.date
                    }
                },
                {
                    type: FIELD_TYPE.text,
                    label: __('Affiliation'),
                    attr: {
                        name: 'affiliation'
                    },
                    validateOn: ['onChange']
                },
                {
                    type: FIELD_TYPE.select,
                    label: __('Sport'),
                    attr: {
                        name: 'sport'
                    },
                    options: selectItemsOptions
                },
                {
                    type: FIELD_TYPE.select,
                    label: __('Category'),
                    attr: {
                        name: 'category'
                    },
                    options: selectItemsOptions
                },
                {
                    type: FIELD_TYPE.select,
                    label: __('Primary color'),
                    attr: {
                        name: 'primary_color'
                    }
                },
                {
                    type: FIELD_TYPE.select,
                    label: __('Secondary color'),
                    attr: {
                        name: 'secondary_color'
                    }
                },
                {
                    type: FIELD_TYPE.text,
                    label: __('Current brand'),
                    attr: {
                        name: 'current_brand'
                    }
                },
                {
                    type: FIELD_TYPE.number,
                    label: __('CONI ID'),
                    attr: {
                        name: 'coni_id'
                    }
                },
                {
                    type: FIELD_TYPE.number,
                    label: __('Membership  No.'),
                    attr: {
                        name: 'membership_no'
                    }
                },
                {
                    type: FIELD_TYPE.number,
                    label: __('Distance from MS'),
                    attr: {
                        name: 'distance'
                    }
                }
            ]
        },
        [CONTACTS_FIELDS]: {
            title: __('Contacts'),
            fields: [
                {
                    type: FIELD_TYPE.text,
                    label: __('Contact person'),
                    attr: {
                        name: 'contact_person'
                    }
                },
                {
                    type: FIELD_TYPE.tel,
                    label: __('Mobile'),
                    attr: {
                        name: 'mobile'
                    },
                    validateOn: ['onChange'],
                    validationRule: {
                        inputType: VALIDATION_INPUT_TYPE.phone
                    }
                },
                {
                    type: FIELD_TYPE.email,
                    label: __('Email'),
                    attr: {
                        name: 'email'
                    },
                    validateOn: ['onChange'],
                    validationRule: {
                        inputType: VALIDATION_INPUT_TYPE.email
                    }
                }
            ]
        }
    };
};
