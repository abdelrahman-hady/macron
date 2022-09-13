/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import Form from 'Component/Form';
import Popup from 'Component/Popup';

import {
    CUSTOMER_CHANGE_CONFIRMATION_POPUP, ORDER_CHOOSE_CUSTOMER_POPUP, ORDER_TYPE_POPUP
} from './OrderTypePopup.config';

import './OrderTypePopup.style';

/** @namespace Scandipwa/Component/OrderTypePopup/Component */
export class OrderTypePopupComponent extends PureComponent {
    static propTypes = {
        handleCustomerClick: PropTypes.func.isRequired,
        handleReplenishmentClick: PropTypes.func.isRequired,
        onGoBack: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        companies: PropTypes.objectOf.isRequired,
        hideActiveOverlay: PropTypes.func.isRequired,
        onConfirm: PropTypes.func.isRequired,
        selectedCustomer: PropTypes.string.isRequired
    };

    renderFirstStep() {
        const { handleCustomerClick, handleReplenishmentClick } = this.props;
        return (
            <Popup
              id={ ORDER_TYPE_POPUP }
              clickOutside={ false }
              mix={ { block: 'OrderTypePopup' } }
            >
                <div block="Wrapper">
                    <h3>{ __('Choose the order type') }</h3>
                    <button
                      block="Button"
                      mods={ { isHollow: true } }
                      onClick={ handleCustomerClick }
                    >
                        { __('Customer order') }
                    </button>
                    <button
                      block="Button"
                      mods={ { isHollow: true } }
                      onClick={ handleReplenishmentClick }
                    >
                        { __('Replenishment order') }
                    </button>
                </div>
            </Popup>
        );
    }

    renderCustomerOrderStep() {
        const {
            onGoBack, onSubmit, companies, selectedCustomer
        } = this.props;

        // eslint-disable-next-line fp/no-let
        let options = [];
        if (companies.partnerCompanies) {
            options = companies.partnerCompanies.map((company) => (
                {
                    value: company.companyName ? company.companyName : '',
                    label: company.companyName
                }
            ));
        }

        return (
            <Popup
              id={ ORDER_CHOOSE_CUSTOMER_POPUP }
              clickOutside={ false }
              mix={ { block: 'OrderChooseCustomerPopup' } }
            >
                <button
                  block="Button"
                  elem="GoBack"
                  mods={ { isHollow: true } }
                  onClick={ onGoBack }
                >
                    { __('< Go back') }
                </button>
                <Form onSubmit={ onSubmit }>
                    <div block="Wrapper">
                        <Field
                          type={ FIELD_TYPE.select }
                          attr={ {
                              id: 'CompanyNames',
                              name: 'CompanyNames',
                              defaultValue: selectedCustomer,
                              noPlaceholder: true
                          } }
                          label={ <b>{ __('Select the customer') }</b> }
                          mix={ { block: 'OrderChooseCustomerPopup', elem: 'SelectCustomer' } }
                          options={ options }
                        />
                        <button
                          block="Button"
                          type={ FIELD_TYPE.submit }
                        >
                            { __('save') }
                        </button>
                    </div>
                </Form>
            </Popup>
        );
    }

    renderCustomerChangeConfirmationStep() {
        const { hideActiveOverlay, onConfirm, onGoBack } = this.props;
        return (
            <Popup
              id={ CUSTOMER_CHANGE_CONFIRMATION_POPUP }
              clickOutside={ false }
              mix={ { block: 'ChangeConfirmationPopup' } }
            >
                <button
                  block="Button"
                  elem="GoBack"
                  mods={ { isHollow: true } }
                  onClick={ onGoBack }
                >
                    { __('< Go back') }
                </button>
                <div block="Wrapper">
                    <h3>{ __('Applied prices might change.') }</h3>
                    <p>{ __('Are you sure you want to change the customer?') }</p>
                    <div block="buttons">
                        <button
                          block="Button"
                          mods={ { isHollow: true } }
                          onClick={ hideActiveOverlay }
                        >
                            { __('Cancel') }
                        </button>
                        <button
                          block="Button"
                          mods={ { isHollow: true } }
                          onClick={ onConfirm }
                        >
                            { __('Yes, change the customer') }
                        </button>
                    </div>
                </div>
            </Popup>
        );
    }

    render() {
        return (
            <div block="OrderTypePopup">
                { this.renderFirstStep() }
                { this.renderCustomerOrderStep() }
                { this.renderCustomerChangeConfirmationStep() }
            </div>
        );
    }
}

export default OrderTypePopupComponent;
