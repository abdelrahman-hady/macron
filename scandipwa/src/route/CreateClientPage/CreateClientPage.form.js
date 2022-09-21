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
export const transformSelectOptions = (items = [], defaultValue) => {
    const selectItemsOptions = [];
    items.forEach(({ id, label }) => {
        selectItemsOptions.push({ label, value: id, isPlaceholder: id === defaultValue });
    });

    return selectItemsOptions;
};

/** @namespace Scandipwa/Route/CreateClientPage/Form/createClientForm */
export const createClientForm = (props, _events = {}) => {
    const {
        clientOptions: {
            affiliations,
            current_brands,
            dates,
            sports,
            colors,
            distances
        },
        client: {
            company_name: companyName,
            address,
            vat_number: vatNumber,
            date_id: dateId,
            affiliation_id: affiliationId,
            sport_id: sportId,
            category,
            primary_color_id: primaryColorId,
            secondary_color_id: secondaryСolorId,
            current_brand_id: currentBrandId,
            coni_id: coniId,
            membership_no: membershipNo,
            distance_id: distanceId,
            contact_person: contactPerson,
            mobile,
            email,
            is_contract_signed: isContractSigned
        }
    } = props;

    const dateOptions = transformSelectOptions(dates, dateId);
    const affiliationOptions = transformSelectOptions(affiliations, affiliationId);
    const sportOptions = transformSelectOptions(sports, sportId);
    const primaryColorOptions = transformSelectOptions(colors, primaryColorId);
    const secondaryСolorOptions = transformSelectOptions(colors, secondaryСolorId);
    const currentBrandOptions = transformSelectOptions(current_brands, currentBrandId);
    const distanceOptions = transformSelectOptions(distances, distanceId);

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
                    type: FIELD_TYPE.checkbox,
                    label: __('Signed Contract'),
                    attr: {
                        name: 'is_contract_signed',
                        defaultChecked: isContractSigned
                    }
                },
                {
                    type: FIELD_TYPE.select,
                    label: __('Contract expiracy date'),
                    attr: {
                        name: 'date_id'
                    },
                    options: dateOptions
                },
                {
                    type: FIELD_TYPE.select,
                    label: __('Affiliation'),
                    attr: {
                        name: 'affiliation_id'
                    },
                    options: affiliationOptions
                },
                {
                    type: FIELD_TYPE.select,
                    label: __('Sport'),
                    attr: {
                        name: 'sport_id'
                    },
                    options: sportOptions
                },
                {
                    type: FIELD_TYPE.text,
                    label: __('Category'),
                    attr: {
                        name: 'category',
                        defaultValue: category
                    }
                },
                {
                    type: FIELD_TYPE.select,
                    label: __('Primary color'),
                    attr: {
                        name: 'primary_color_id'
                    },
                    options: primaryColorOptions
                },
                {
                    type: FIELD_TYPE.select,
                    label: __('Secondary color'),
                    attr: {
                        name: 'secondary_color_id'
                    },
                    options: secondaryСolorOptions
                },
                {
                    type: FIELD_TYPE.select,
                    label: __('Current brand'),
                    attr: {
                        name: 'current_brand_id'
                    },
                    options: currentBrandOptions
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
                    type: FIELD_TYPE.select,
                    label: __('Distance from MS'),
                    attr: {
                        name: 'distance_id'
                    },
                    options: distanceOptions
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
