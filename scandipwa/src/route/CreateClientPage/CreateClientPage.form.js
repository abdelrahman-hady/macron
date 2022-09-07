/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import FIELD_TYPE from 'Component/Field/Field.config';
import { VALIDATION_INPUT_TYPE } from 'Util/Validator/Config';

import { CONTACTS_FIELDS, DETAILS_FIELDS } from './CreateClientPage.config';

/** @namespace Scandipwa/Route/CreateClientPage/Form/transformSelectOptions */
export const transformSelectOptions = (items, defaultValue) => {
    const selectItemsOptions = [];
    items.forEach(({ name, id }) => {
        selectItemsOptions.push({ label: name, value: id, isPlaceholder: id === defaultValue });
    });

    return selectItemsOptions;
};

/** @namespace Scandipwa/Route/CreateClientPage/Form/createClientForm */
export const createClientForm = (props, _events = {}) => {
    const {
        selectItems,
        client: {
            company_name: companyName,
            address,
            vat_number: vatNumber,
            contract_expiracy_date: date,
            affiliation,
            sport,
            category,
            primary_color: primaryColor,
            secondary_color: secondaryСolor,
            current_brand: currentBrand,
            coni_id: coniId,
            membership_no: membershipNo,
            distance,
            contact_person: contactPerson,
            mobile,
            email
        }
    } = props;

    const sportOptions = transformSelectOptions(selectItems, sport);
    const categoryOptions = transformSelectOptions(selectItems, category);
    const primaryColorOptions = transformSelectOptions(selectItems, primaryColor);
    const secondaryСolorOptions = transformSelectOptions(selectItems, secondaryСolor);

    return {
        [DETAILS_FIELDS]: {
            title: __('Client details'),
            fields: [
                {
                    type: FIELD_TYPE.text,
                    label: __('Company name'),
                    addRequiredTag: true,
                    attr: {
                        name: 'company_name',
                        defaultValue: companyName
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
                        name: 'address',
                        defaultValue: address
                    }
                },
                {
                    type: FIELD_TYPE.number,
                    label: __('VAT number'),
                    attr: {
                        name: 'vat_number',
                        defaultValue: vatNumber
                    }
                },
                {
                    type: FIELD_TYPE.date,
                    label: __('Contract expiracy date'),
                    attr: {
                        name: 'contract_expiracy_date',
                        defaultValue: date
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
                        name: 'affiliation',
                        defaultValue: affiliation
                    },
                    validateOn: ['onChange']
                },
                {
                    type: FIELD_TYPE.select,
                    label: __('Sport'),
                    attr: {
                        name: 'sport'
                    },
                    options: sportOptions
                },
                {
                    type: FIELD_TYPE.select,
                    label: __('Category'),
                    attr: {
                        name: 'category'
                    },
                    options: categoryOptions
                },
                {
                    type: FIELD_TYPE.select,
                    label: __('Primary color'),
                    attr: {
                        name: 'primary_color'
                    },
                    options: primaryColorOptions
                },
                {
                    type: FIELD_TYPE.select,
                    label: __('Secondary color'),
                    attr: {
                        name: 'secondary_color'
                    },
                    options: secondaryСolorOptions
                },
                {
                    type: FIELD_TYPE.text,
                    label: __('Current brand'),
                    attr: {
                        name: 'current_brand',
                        defaultValue: currentBrand
                    }
                },
                {
                    type: FIELD_TYPE.number,
                    label: __('CONI ID'),
                    attr: {
                        name: 'coni_id',
                        defaultValue: coniId
                    }
                },
                {
                    type: FIELD_TYPE.number,
                    label: __('Membership  No.'),
                    attr: {
                        name: 'membership_no',
                        defaultValue: membershipNo
                    }
                },
                {
                    type: FIELD_TYPE.number,
                    label: __('Distance from MS'),
                    attr: {
                        name: 'distance',
                        defaultValue: distance
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
                        name: 'contact_person',
                        defaultValue: contactPerson
                    }
                },
                {
                    type: FIELD_TYPE.tel,
                    label: __('Mobile'),
                    attr: {
                        name: 'mobile',
                        defaultValue: mobile
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
                        name: 'email',
                        defaultValue: email
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
